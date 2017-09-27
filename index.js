'use strict';

const bob = require('elastic-builder');
const serializer = require('serialijse');

Object.keys(bob)
    .filter(
        name =>
            bob[name].prototype != null &&
            name === bob[name].prototype.constructor.name
    )
    .forEach(clsName => {
        serializer.declarePersistable(bob[clsName]);
    });

/**
 * Marshalls an object created using `elastic-builder` into a serialised string.
 *
 * @param {Object} builderQry An object instance created using `elastic-builder`
 * @returns {string} Serialised equivalent of `builderQry`.
 */
exports.marshal = function marshal(builderQry) {
    return serializer.serialize(builderQry);
};

/**
 * Unmarshalls the query string into `elastic-builder` object.
 *
 * @param {string} qryStr
 * @returns {Object} `elastic-builder` object which was used to serialize the
 * object.
 */
exports.unmarshal = function unmarshal(qryStr) {
    return serializer.deserialize(qryStr);
};
