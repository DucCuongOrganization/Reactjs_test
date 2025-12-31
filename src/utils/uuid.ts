/**
 * Generate UUID with fallback for older browsers
 *
 * Uses a 3-tier strategy:
 * 1. Native crypto.randomUUID() (Chrome 92+, Firefox 95+)
 * 2. crypto.getRandomValues() for RFC4122 v4 UUID (secure)
 * 3. Math.random() as last resort (less secure but compatible)
 */
export const generateUUID = (): string => {
  // Use native crypto.randomUUID if available (Chrome 92+, Firefox 95+)
  if (typeof crypto?.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // Fallback: RFC4122 v4 UUID using crypto.getRandomValues
  // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  if (typeof crypto?.getRandomValues === "function") {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Last resort fallback using Math.random (less secure but compatible)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
