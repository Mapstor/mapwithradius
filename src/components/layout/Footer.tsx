import Link from 'next/link';

const toolsLinks = [
  { href: '/', label: 'Radius Map' },
  { href: '/drive-time-map', label: 'Drive Time Map' },
  { href: '/zip-code-radius', label: 'Zip Code Radius' },
  { href: '/km-radius-map', label: 'KM Radius Map' },
  { href: '/walking-radius-map', label: 'Walking Map' },
  { href: '/distance-calculator', label: 'Distance Calculator' },
];

const resourcesLinks = [
  { href: '/radius-on-google-maps', label: 'Radius on Google Maps' },
  { href: '/geofence-map', label: 'Geofence Map' },
  { href: '/alternatives/freemaptools', label: 'FreeMapTools Alternative' },
  { href: '/alternatives/mapdevelopers', label: 'MapDevelopers Alternative' },
];

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy Policy' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and tagline */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <svg className="w-7 h-7 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-xl font-bold">
              <span className="text-white">Map With </span>
              <span className="text-accent">Radius</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm max-w-md">
            Free online tool to draw radius circles on a map. No signup required, no limits.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Tools Column */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Tools</h3>
            <ul className="space-y-3">
              {toolsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Column */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Built With</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://leafletjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Leaflet
                </a>
              </li>
              <li>
                <a
                  href="https://www.openstreetmap.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  OpenStreetMap
                </a>
              </li>
              <li>
                <a
                  href="https://nominatim.openstreetmap.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Nominatim
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Map With Radius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
