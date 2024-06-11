export function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export function formatSeconds(s: number) {
  let m: string | number = Math.floor(s / 60);
  m = m >= 10 ? m : "0" + m;
  s = Math.floor(s % 60);
  let seconds = s >= 10 ? s : "0" + s;
  return m + ":" + seconds;
}
