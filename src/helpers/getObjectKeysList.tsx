/**
 * Returns a comma separated string of an objects values.
 *
 * @remarks
 * Useful for debugging, especially for local storage and blinds
 *
 * @param obj - The object
 * @returns A string containing a list of the objects keys, separated with a comma
 */
const getObjectKeysList = (obj: { [key:string]: any }) => Object.keys(obj).join(", ");
export default getObjectKeysList;