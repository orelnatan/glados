
export function jsonParse<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}