/**
 * Minimal class name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this project does not need
 * conflict resolution, and two dependencies for eight lines of code is not a
 * trade worth making.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
