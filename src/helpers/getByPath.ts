/**
 * Returns the value/reference within an item based on a given path
 *
 * @remarks
 * This function can take in any item -- primitive, array, or object. It is most useful with arrays and objects, however.
 * The path is a string in the form of a js path. (i.e. thing.foo.bar, or foo[0].bar).
 * It also supports creating undefined paths, including pushing to an array when no index is provided (i.e. foo[]).
 * NOTE: Although the function will return references instead of values, all primitives in JavaScript are values, so
 * if the item at the path given is a primitive, a value will be returned instead of a reference.
 * NOTE: Currently only supports 1D arrays. (i.e. foo[0][1] will NOT work)
 *
 * @param item - The thing we are searching in
 * @param path - The place we are looking at. (Supports js path rules, and empty [] for pushing to an array).
 * @param createUndefinedPaths - Optional. When true, the function will create values for any place in the path that is undefined. Defaults to false.
 * @returns The reference to or value of the item located at the path specified, in the item provided.
 *
 * @beta
 */
const getByPath = (item: any, path: string, createUndefinedPaths = false) => {
    const keys = path.split(".");

    let pathObject = item;

    keys.forEach((key, index) => {
        if(key === '') return;
        if(typeof pathObject !== "object") throw new Error(`Key "${keys[index-1]}" in path "${path}" is not an object. Property "${key}" cannot be read.`);

        /**
         * TODO: support n-D arrays (i.e. foo[0][1][2]...)
         *  match all indices with (?<=(.*))\[(\d*)] (results in capture group 2)
         *  maybe can do conditional first capture to avoid capturing "keys" like
         *  foo, foo[0]. foo[0][1]. (make first capture group at start of line, then OR it with a
         *  non-capture group of the same nature. Psuedoregex: (?<=(^.*)|(?:.*))\d[(\d+)]
         *  alternatively, capture all indices, and regex again to match each individually
         */
        const match = /(.*)\[(\d*)]$/.exec(key);

        if(match) {
            const [, arrayKey, arrayIndex] = match;
            if( createUndefinedPaths && arrayKey !== "" && pathObject[arrayKey] === undefined) {
                pathObject[arrayKey] = [];
            }
            if(arrayKey !== "") {
                pathObject = pathObject[arrayKey];
            }
            if(arrayIndex) {
                if(createUndefinedPaths && pathObject[arrayIndex] === undefined) {
                    pathObject[arrayIndex] = {};
                }
                pathObject = pathObject[arrayIndex];
            } else {
                pathObject.push({});
                pathObject = pathObject[pathObject.length - 1];
            }
        } else {
            if(createUndefinedPaths && pathObject[key] === undefined) {
                pathObject[key] = {};
            }
            pathObject = pathObject[key];
        }
    });

    return pathObject;
};

export default getByPath;