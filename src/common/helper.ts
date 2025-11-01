import { TOKEN } from "./constants";

export function withToken(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}authToken=${TOKEN}`;
}