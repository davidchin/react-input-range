/**
 * Captialize a string
 * @ignore
 * @param {string} string
 * @return {string}
 */
export default function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
