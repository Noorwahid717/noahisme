const isBrowser = typeof window !== "undefined";

export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (!isBrowser) return;
  const plausible = (
    window as unknown as {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    }
  ).plausible;
  plausible?.(name, data ? { props: data } : undefined);
}
