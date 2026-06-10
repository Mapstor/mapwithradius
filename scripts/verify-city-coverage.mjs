// Comprehensive distance verifier for ALL named places across ALL city pages.
// Reads cities.ts, for each city locates each radius bucket, checks every known
// place against actual haversine distance, and reports mismatches.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CITIES_PATH = resolve(__dirname, '..', 'src', 'data', 'cities.ts');
const text = readFileSync(CITIES_PATH, 'utf8');
const EARTH_MI = 3958.8, EARTH_KM = 6371.0;

function hav(la1,lo1,la2,lo2,R){const t=x=>x*Math.PI/180;const dLa=t(la2-la1),dLo=t(lo2-lo1);const a=Math.sin(dLa/2)**2+Math.cos(t(la1))*Math.cos(t(la2))*Math.sin(dLo/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}

function getCity(slug) {
  const m = text.indexOf(`slug: '${slug}'`);
  if (m<0) return null;
  const next = text.indexOf("slug: '", m+10);
  return text.substring(m, next>0?next:text.length);
}
function getBucket(section, r) {
  const re = new RegExp(`radius:\\s*${r},`);
  const sm = re.exec(section);
  if (!sm) return null;
  const start = sm.index;
  const tail = section.substring(start+sm[0].length);
  const nxt = /radius:\s*\d+/.exec(tail);
  return section.substring(start, nxt ? start+sm[0].length+nxt.index : section.length);
}
function side(bucketText, place) {
  const inc = /includes:\s*\[([\s\S]*?)\],/m.exec(bucketText);
  const exc = /excludes:\s*\[([\s\S]*?)\],/m.exec(bucketText);
  if (!inc||!exc) return 'parse-error';
  const i = inc[1].includes(place), e = exc[1].includes(place);
  if (i&&e) return 'both';
  if (i) return 'includes';
  if (e) return 'excludes';
  return 'missing';
}

// Master table: each city → anchor + unit + places.
// Anchor matches city.lat/lng in cities.ts.
const C = {
  'los-angeles':   {a:[34.0522,-118.2437], u:'mi', p:[
    ['Hollywood',34.0928,-118.3287,[1,5,10]],
    ['Echo Park',34.0779,-118.2606,[1,5]],
    ['University of Southern California',34.0224,-118.2851,[1]],
    ['USC',34.0224,-118.2851,[5]],
    ['Beverly Hills',34.0736,-118.4004,[5,10]],
    ['Santa Monica',34.0195,-118.4912,[5,10,25]],
    ['Pasadena',34.1478,-118.1445,[5,10]],
    ['Culver City',34.0211,-118.3965,[10]],
    ['Glendale',34.1425,-118.2551,[10,25]],
    ['Inglewood',34.0297,-118.3527,[10]],
    ['Burbank Bob Hope Airport',34.2007,-118.3585,[10]],
    ['Long Beach',33.7701,-118.1937,[10,25]],
    ['Burbank',34.1808,-118.3090,[25]],
    ['LAX',33.9425,-118.4081,[25]],
    ['Anaheim',33.8366,-117.9143,[25]],
    ['Malibu',34.0259,-118.7798,[25,50]],
    ['Irvine',33.6846,-117.8265,[25,50]],
    ['Riverside',33.9806,-117.3755,[25,50]],
    ['Lancaster',34.6868,-118.1542,[25,50]],
    ['Disneyland',33.8121,-117.9189,[50]],
    ['San Diego',32.7157,-117.1611,[50]],
    ['Bakersfield',35.3733,-119.0187,[50]],
    ['Palm Springs',33.8303,-116.5453,[50]],
    ['Santa Barbara',34.4208,-119.6982,[50]],
  ]},
  'san-francisco': {a:[37.7879,-122.4075], u:'mi', p:[
    ['Oakland',37.8044,-122.2712,[5,10]],
    ['Sausalito',37.8590,-122.4853,[5,10]],
    ['Berkeley',37.8716,-122.2727,[5,10]],
    ['San Mateo',37.5630,-122.3255,[5]],
    ['San Francisco International Airport',37.6213,-122.3790,[5,10,15]],
    ['SFO',37.6213,-122.3790,[15]],
    ['Walnut Creek',37.9101,-122.0652,[10,15,25]],
    ['San Jose',37.3382,-121.8863,[10,15,25,50]],
    ['Palo Alto',37.4419,-122.1430,[10,15]],
    ['Napa',38.2975,-122.2869,[10,15,50]],
    ['Half Moon Bay',37.4636,-122.4286,[15,25]],
    ['Santa Cruz',36.9741,-122.0308,[25,50]],
    ['Livermore',37.6819,-121.7681,[25]],
    ['Santa Rosa',38.4404,-122.7144,[25,50]],
    ['Tracy',37.7397,-121.4252,[50]],
    ['Sacramento',38.5816,-121.4944,[50]],
    ['Monterey',36.6002,-121.8947,[50]],
    ['Stockton',37.9577,-121.2908,[50]],
    ['Modesto',37.6391,-120.9969,[50]],
  ]},
  'boston':        {a:[42.3554,-71.0656], u:'mi', p:[
    ['Newton',42.3370,-71.2092,[3,5,10]],
    ['Quincy',42.2529,-71.0023,[3,5]],
    ['Logan',42.3656,-71.0096,[3,5]], // Logan Airport
    ['Lexington',42.4473,-71.2245,[5,10]],
    ['Waltham',42.3765,-71.2356,[5,10]],
    ['Cambridge',42.3736,-71.1097,[5]],
    ['Somerville',42.3876,-71.0995,[5]],
    ['Brookline',42.3318,-71.1212,[5]],
    ['Framingham',42.2793,-71.4162,[10,25]],
    ['Worcester',42.2626,-71.8023,[10,25,50]],
    ['Providence',41.8240,-71.4128,[10,25,50]],
    ['Lowell',42.6334,-71.3162,[10,25]],
    ['Plymouth',41.9584,-70.6673,[10,50]],
    ['Hyannis',41.6529,-70.2962,[50]],
    ['Hartford',41.7637,-72.6851,[50]],
    ['Portland, ME',43.6591,-70.2568,[50]],
    ['Springfield, MA',42.1015,-72.5898,[50]],
    ['Provincetown',42.0584,-70.1781,[50]],
  ]},
  'miami':         {a:[25.7741,-80.1857], u:'mi', p:[
    ['Miami International Airport',25.7959,-80.2870,[5,10]],
    ['Coral Gables',25.7215,-80.2684,[5,10]],
    ['Hialeah',25.8576,-80.2781,[5,10]],
    ['Aventura',25.9565,-80.1392,[5,10]],
    ['North Miami Beach',25.9331,-80.1625,[5]],
    ['Hollywood, FL',26.0112,-80.1495,[10,25]],
    ['Kendall',25.6792,-80.3175,[10]],
    ['Doral',25.8195,-80.3553,[10]],
    ['Homestead',25.4687,-80.4776,[10,25]],
    ['Pembroke Pines',26.0078,-80.2962,[25]],
    ['Fort Lauderdale',26.1224,-80.1373,[25]],
    ['Boca Raton',26.3683,-80.1289,[25,50]],
    ['West Palm Beach',26.7153,-80.0534,[50]],
    ['Key Largo',25.0865,-80.4473,[25,50]],
    ['Marathon',24.7136,-81.0905,[50,100]],
    ['Key West',24.5551,-81.7800,[50,100]],
    ['Naples',26.1420,-81.7948,[50,100]],
    ['Orlando',28.5383,-81.3792,[50,100]],
    ['Tampa',27.9506,-82.4572,[100]],
    ['Jacksonville',30.3322,-81.6557,[100]],
  ]},
  'washington-dc': {a:[38.8977,-77.0365], u:'mi', p:[
    ['Reagan National Airport',38.8512,-77.0402,[3,5]],
    ['Bethesda',38.9847,-77.0947,[3,5,10]],
    ['Silver Spring',38.9907,-77.0261,[3,5,10]],
    ['Alexandria',38.8048,-77.0469,[3,5,10]],
    ['Tysons Corner',38.9187,-77.2311,[3,5,10,25]],
    ['Rockville',39.0840,-77.1528,[10,25]],
    ['Reston',38.9586,-77.3570,[10,25]],
    ['Fairfax',38.8462,-77.3064,[10,25]],
    ['Dulles Airport',38.9531,-77.4565,[5,10,25]],
    ['Frederick',39.4143,-77.4105,[25,50]],
    ['Baltimore',39.2904,-76.6122,[25,50]],
    ['Manassas',38.7509,-77.4753,[25,50]],
    ['Annapolis',38.9784,-76.4922,[25,50]],
    ['Leesburg',39.1157,-77.5636,[25,50]],
    ['Fredericksburg',38.3032,-77.4605,[50]],
    ['Richmond',37.5407,-77.4360,[50]],
    ['Hagerstown',39.6418,-77.7200,[50]],
    ['Philadelphia',39.9526,-75.1652,[50]],
    ['Charlottesville',38.0293,-78.4767,[50]],
  ]},
  'seattle':       {a:[47.6097,-122.3422], u:'mi', p:[
    ['Sea-Tac Airport',47.4502,-122.3088,[5,10,15]],
    ['SEA',47.4502,-122.3088,[15]],
    ['Bellevue',47.6101,-122.2015,[5,10]],
    ['Redmond',47.6740,-122.1215,[5,10,15]],
    ['Bothell',47.7623,-122.2054,[5,15]],
    ['Lynnwood',47.8209,-122.3151,[5]],
    ['Renton',47.4829,-122.2171,[5,10]],
    ['Mercer Island',47.5707,-122.2221,[10]],
    ['Kirkland',47.6815,-122.2087,[10]],
    ['Issaquah',47.5301,-122.0326,[10,15]],
    ['Everett',47.9790,-122.2021,[10,15,25]],
    ['Tacoma',47.2529,-122.4443,[10,15,25,50]],
    ['Federal Way',47.3223,-122.3126,[15]],
    ['Sammamish',47.6163,-122.0356,[15]],
    ['Olympia',47.0379,-122.9007,[15,25,50]],
    ['Bremerton',47.5673,-122.6329,[15,25]],
    ['North Bend',47.4954,-121.7866,[15,25]],
    ['Bellingham',48.7519,-122.4787,[25,50]],
    ['Mount Rainier',46.8523,-121.7603,[25,50]],
    ['Portland, OR',45.5152,-122.6784,[50]],
    ['Yakima',46.6021,-120.5059,[50]],
    ['Vancouver, BC',49.2827,-123.1207,[50]],
  ]},
  'toronto':       {a:[43.6532,-79.3832], u:'km', p:[
    ['CN Tower',43.6426,-79.3871,[1]],
    ['Pearson Airport',43.6777,-79.6248,[5,10,25]],
    ['High Park',43.6465,-79.4637,[5,10]],
    ['Mississauga',43.5890,-79.6441,[10,25]],
    ['Vaughan',43.8361,-79.4985,[10,25]],
    ['Brampton',43.7315,-79.7624,[25]],
    ['Pickering',43.8385,-79.0867,[25]],
    ['Hamilton',43.2557,-79.8711,[25,50]],
    ['Oshawa',43.8971,-78.8658,[25,50]],
    ['Burlington',43.3255,-79.7990,[25,50]],
    ['Niagara Falls',43.0896,-79.0849,[25,50]],
    ['Newmarket',44.0592,-79.4613,[50]],
    ['Aurora',43.9978,-79.4546,[50]],
    ['London, ON',42.9849,-81.2453,[50]],
    ['Kingston, ON',44.2312,-76.4860,[50]],
  ]},
  'vancouver':     {a:[49.289,-123.111], u:'km', p:[
    ['YVR',49.1967,-123.1815,[5,10,15]],
    ['UBC',49.2606,-123.2460,[5,10]],
    ['Burnaby',49.2488,-122.9805,[5,10]],
    ['Richmond',49.1666,-123.1336,[5,10]],
    ['New Westminster',49.2057,-122.9110,[5,10,15]],
    ['Surrey',49.1913,-122.8490,[10,15]],
  ]},
  'paris':         {a:[48.8566,2.3522], u:'km', p:[
    ['Eiffel Tower',48.8584,2.2945,[1]],
    ['Montmartre',48.8867,2.3431,[1]],
    ['Bastille',48.8533,2.3690,[1]],
    ['Père Lachaise',48.8614,2.3933,[1]],
    ['La Défense',48.8924,2.2390,[5,10]],
    ['Saint-Denis',48.9362,2.3574,[5,10]],
    ['Versailles',48.8049,2.1204,[5,10,25]],
    ['Charles de Gaulle Airport',49.0097,2.5479,[5,10,25]],
    ['Orly Airport',48.7233,2.3791,[10,25]],
    ['Disneyland Paris',48.8722,2.7758,[10,25]],
    ['Saint-Germain-en-Laye',48.8978,2.0938,[25]],
    ['Créteil',48.7892,2.4555,[25]],
    ['Cergy-Pontoise',49.0392,2.0763,[25]],
    ['Chartres',48.4469,1.4894,[25,50]],
    ['Reims',49.2583,4.0317,[25,50]],
    ['Beauvais',49.4297,2.0807,[25,50]],
    ['Fontainebleau',48.4047,2.7016,[25,50]],
    ['Rouen',49.4432,1.0993,[50]],
    ['Orléans',47.9029,1.9039,[50]],
    ['Le Havre',49.4944,0.1079,[50]],
  ]},
  'berlin':        {a:[52.52,13.405], u:'km', p:[
    ['Brandenburg Gate',52.5163,13.3777,[1]],
    ['Reichstag',52.5186,13.3762,[1]],
    ['Checkpoint Charlie',52.5076,13.3904,[1]],
    ['Tegel',52.5597,13.2877,[5,10]],
    ['Tempelhof',52.4731,13.4036,[5,10]],
    ['Olympiastadion',52.5147,13.2395,[5,10]],
    ['Schöneberg',52.4828,13.3540,[5]],
    ['BER Airport',52.3667,13.5033,[10,25]],
    ['Spandau',52.5447,13.2073,[10,25]],
    ['Köpenick',52.4452,13.5764,[10,25]],
    ['Potsdam',52.3906,13.0645,[25]],
    ['Bernau',52.6786,13.5878,[25,50]],
    ['Oranienburg',52.7549,13.2360,[25,50]],
    ['Brandenburg an der Havel',52.4125,12.5447,[25,50]],
    ['Frankfurt (Oder)',52.3475,14.5503,[25,50]],
    ['Cottbus',51.7563,14.3329,[25,50]],
    ['Magdeburg',52.1205,11.6276,[25,50]],
    ['Fürstenwalde',52.3614,14.0683,[50]],
    ['Eberswalde',52.8344,13.8222,[50]],
    ['Dresden',51.0504,13.7373,[50]],
  ]},
  'madrid':        {a:[40.4168,-3.7038], u:'km', p:[
    ['Santiago Bernabéu Stadium',40.4530,-3.6884,[1]],
    ['Atocha Station',40.4070,-3.6906,[1]],
    ['Madrid-Barajas Airport',40.4936,-3.5668,[5,10,25]],
    ['Pozuelo de Alarcón',40.4326,-3.8131,[5,10]],
    ['Las Rozas',40.4942,-3.8744,[5,10]],
    ['Getafe',40.3081,-3.7325,[5,10]],
    ['Alcobendas',40.5419,-3.6383,[10]],
    ['Majadahonda',40.4729,-3.8722,[25]],
    ['Boadilla del Monte',40.4081,-3.8765,[25]],
    ['Alcorcón',40.3459,-3.8246,[25]],
    ['Móstoles',40.3232,-3.8649,[25]],
    ['Fuenlabrada',40.2842,-3.7943,[25]],
    ['Parla',40.2378,-3.7686,[25]],
    ['San Sebastián de los Reyes',40.5466,-3.6242,[10,25]],
    ['Tres Cantos',40.6065,-3.7178,[25]],
    ['Alcalá de Henares',40.4818,-3.3645,[10,25]],
    ['Toledo',39.8628,-4.0273,[25,50]],
    ['Segovia',40.9484,-4.1175,[25,50]],
    ['Ávila',40.6566,-4.7000,[25,50]],
    ['Aranjuez',40.0341,-3.6005,[25,50]],
    ['Guadalajara',40.6294,-3.1666,[50]],
    ['Cuenca',40.0703,-2.1374,[50]],
  ]},
  'rome':          {a:[41.8986,12.4769], u:'km', p:[
    ['Vatican City',41.9029,12.4534,[1]],
    ['Colosseum',41.8902,12.4922,[1]],
    ['Termini Station',41.9009,12.5018,[1]],
    ['EUR',41.8329,12.4664,[5]],
    ['Olympic Stadium',41.9337,12.4548,[5,10]],
    ['Fiumicino Airport',41.8003,12.2389,[5,10,25]],
    ['Ciampino Airport',41.7994,12.5949,[10,25]],
    ['Castel Gandolfo',41.7456,12.6500,[5,10]],
    ['Tivoli',41.9633,12.7958,[10,25]],
    ['Anzio',41.4493,12.6286,[25,50]],
    ['Civitavecchia',42.0942,11.7956,[25,50]],
    ['Viterbo',42.4207,12.1077,[25,50]],
    ['Naples',40.8518,14.2681,[25,50]],
    ['Florence',43.7696,11.2558,[50]],
    ['Pescara',42.4584,14.2152,[50]],
    ['Perugia',43.1107,12.3908,[50]],
  ]},
  'manchester':    {a:[53.4808,-2.2426], u:'km', p:[
    ['Old Trafford',53.4631,-2.2913,[1,5]],
    ['Etihad Stadium',53.4831,-2.2004,[1,5]],
    ['University of Manchester',53.4668,-2.2339,[1,5]],
    ['Salford Quays',53.4720,-2.2960,[1,5]],
    ['Manchester Airport',53.3537,-2.2750,[5,10]],
    ['Stockport',53.4106,-2.1575,[5,10]],
    ['Bury',53.5933,-2.2966,[5,10]],
    ['Oldham',53.5409,-2.1114,[5,10]],
    ['Sale',53.4239,-2.3225,[10]],
    ['Altrincham',53.3838,-2.3547,[10]],
    ['Bolton',53.5768,-2.4282,[10,25]],
    ['Rochdale',53.6097,-2.1561,[10,25]],
    ['Wigan',53.5450,-2.6325,[10,25]],
    ['Wilmslow',53.3265,-2.2398,[25]],
    ['Knutsford',53.3026,-2.3744,[25]],
    ['Liverpool',53.4084,-2.9916,[25,50]],
    ['Sheffield',53.3811,-1.4701,[25,50]],
    ['Preston',53.7632,-2.7031,[25,50]],
    ['Macclesfield',53.2585,-2.1255,[25]],
    ['Crewe',53.0980,-2.4395,[50]],
    ['Halifax',53.7218,-1.8567,[50]],
    ['Bradford',53.7960,-1.7594,[50]],
    ['Leeds',53.8008,-1.5491,[50]],
    ['Hull',53.7676,-0.3274,[50]],
    ['Birmingham',52.4862,-1.8904,[50]],
    ['Newcastle',54.9784,-1.6174,[50]],
  ]},
  'sydney':        {a:[-33.8688,151.2093], u:'km', p:[
    ['Sydney Opera House',-33.8568,151.2153,[1]],
    ['Sydney Harbour Bridge',-33.8523,151.2108,[1]],
    ['Bondi Beach',-33.8915,151.2767,[5,10]],
    ['Manly',-33.7969,151.2855,[5,10]],
    ['Parramatta',-33.8150,151.0011,[5,10,25]],
    ['Sydney Airport',-33.9399,151.1753,[5,10]],
    ['Cronulla',-34.0571,151.1521,[10]],
    ['Hornsby',-33.7042,151.0995,[10]],
    ['Penrith',-33.7507,150.6943,[10,25,50]],
    ['Wollongong',-34.4278,150.8931,[25,50]],
    ['Newcastle',-32.9283,151.7817,[25,50]],
    ['Blue Mountains',-33.7000,150.3000,[25,50]],
    ['Central Coast',-33.4282,151.3422,[50]],
  ]},
  'singapore':     {a:[1.2868,103.8545], u:'km', p:[]},
  'hong-kong':     {a:[22.281,114.1593], u:'km', p:[]},
  'auckland':      {a:[-36.8484,174.7621], u:'km', p:[]},
  'dublin':        {a:[53.347,-6.2598], u:'km', p:[]},
  'amsterdam':     {a:[52.373,4.8924], u:'km', p:[]},
  'barcelona':     {a:[41.387,2.17], u:'km', p:[]},
  'munich':        {a:[48.1374,11.5755], u:'km', p:[]},
};

const TOL = (r) => Math.max(0.5, r * 0.02);

let fails = 0, passed = 0;
for (const [slug, cfg] of Object.entries(C)) {
  const section = getCity(slug);
  if (!section) { console.log('NO SECTION:', slug); continue; }
  const R = cfg.u === 'km' ? EARTH_KM : EARTH_MI;
  for (const [name, plat, plng, radii] of cfg.p) {
    const dist = hav(cfg.a[0], cfg.a[1], plat, plng, R);
    for (const r of radii) {
      const bucket = getBucket(section, r);
      if (!bucket) { console.log(`NO BUCKET: ${slug} r=${r}`); continue; }
      const expected = dist <= r ? 'includes' : 'excludes';
      const actual = side(bucket, name);
      if (actual === 'missing') continue;
      if (actual === 'parse-error') { console.log(`PARSE-ERR ${slug} r=${r} ${name}`); fails++; continue; }
      const tol = TOL(r);
      const borderline = Math.abs(dist - r) <= tol;
      if (actual === 'both') {
        // BOTH-SIDES is usually intentional disambiguation: "X's edge inside"
        // in includes + "X city centre outside" in excludes. The substring match
        // doesn't know prose. Surface as info, don't fail the build.
        console.log(`info: ${slug} r=${r} "${name}" appears in both includes & excludes (likely "X's edge" + "X centre" disambiguation — check manually if unexpected)`);
        continue;
      }
      if (actual !== expected && !borderline) {
        console.log(`FAIL ${slug} r=${r} "${name}" is in ${actual} but distance ${dist.toFixed(1)}${cfg.u} → should be ${expected}`);
        fails++;
      } else {
        passed++;
      }
    }
  }
}
console.log(`\nDone: ${passed} passed, ${fails} failed`);
