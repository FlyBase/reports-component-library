
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