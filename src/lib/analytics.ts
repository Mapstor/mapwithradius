// Thin wrapper over the page's existing GA4 gtag shim (configured in the root layout with
// Consent Mode v2). Firing through gtag means Google's Consent Mode gates delivery
// automatically — no manual consent check here (that would break cookieless modeling).

export type CircleAction = 'create' | 'resize' | 'move';

/**
 * GA4 custom event for the core tool action. Lets us measure the share of visitors who
 * actually draw / resize / move a circle. gtag exists on every host (Consent Mode snippet),
 * but the layout only loads + configures GA on mapwithradius.com, so elsewhere the event
 * just queues in dataLayer and is never sent. No-op under SSR (no window/gtag).
 */
export function trackCircleInteraction(action: CircleAction, radiusMi: number): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', 'circle_interaction', {
    action,
    radius_mi: Math.round(radiusMi * 10) / 10,
  });
}
