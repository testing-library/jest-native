'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getParentElement = exports.isHostElement = void 0;
/**
 * Checks if the given element is a host element.
 * @param element The element to check.
 */
function isHostElement(element) {
  return typeof element?.type === 'string';
}
exports.isHostElement = isHostElement;
/**
 * Returns first host ancestor for given element or first ancestor of one of
 * passed component types.
 *
 * @param element The element start traversing from.
 * @param componentTypes Additional component types to match.
 */
function getParentElement(element, componentTypes = []) {
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
exports.getParentElement = getParentElement;
