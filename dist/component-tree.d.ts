import type React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
/**
 * Checks if the given element is a host element.
 * @param element The element to check.
 */
export declare function isHostElement(element?: ReactTestInstance | null): boolean;
/**
 * Returns first host ancestor for given element or first ancestor of one of
 * passed component types.
 *
 * @param element The element start traversing from.
 * @param componentTypes Additional component types to match.
 */
export declare function getParentElement(
  element: ReactTestInstance | null,
  componentTypes?: React.ElementType[],
): ReactTestInstance | null;
