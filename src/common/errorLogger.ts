/**
 * Centralized error handling utility

 */

const isDev = import.meta.env.MODE === "development";

export function logError(context: string, error: unknown): void {
  const message =
    error instanceof Error ? error.message : JSON.stringify(error);

  if (isDev) {
    console.warn(`[${context}] → ${message}`);
  }
}

/**
 * Returns a message for API/UI feedback.
 */
export function getFriendlyMessage(defaultMessage: string): string {
  return `${defaultMessage} Please try again later.`;
}