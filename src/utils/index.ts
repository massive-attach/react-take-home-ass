export function randString() {
  return Math.random().toString(36).substr(2, 5);
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
