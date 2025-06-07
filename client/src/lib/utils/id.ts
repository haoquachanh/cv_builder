let counter = 0;

export function generateId(prefix: string = "id") {
  counter += 1;
  return `${prefix}_${counter}`;
}
