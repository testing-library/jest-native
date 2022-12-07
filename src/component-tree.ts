import type React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';

/**
 * Checks if the given element is a host element.
 * @param element The element to check.
 */
export function isHostElement(element?: ReactTestInstance | null): boolean {
  return typeof element?.type === 'string';
}

/**
 * Returns first host ancestor for given element or first ancestor of one of
 * passed component types.
 *
 * @param element The element start traversing from.
 * @param componentTypes Additional component types to match.
 */
export function getParentElement(
  element: ReactTestInstance | null,
  componentTypes: React.ElementType[] = [],
): ReactTestInstance | null {
  if (element == null) {
    return null;
  }

  let current = element.parent;
  while (current) {
    if (isHostElement(current) || componentTypes.includes(current.type)) {
      return current;
    }

    current = current.parent;
  }

  return null;
}
