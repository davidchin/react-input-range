/**
 * Bind all methods of an object to itself
 * @ignore
 * @param {Function[]} methodNames
 * @param {Object} instance
 */
export default function autobind(methodNames, instance) {
  /* eslint-disable no-param-reassign */
  methodNames.forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}
