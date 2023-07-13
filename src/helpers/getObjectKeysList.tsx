const getObjectKeysList = (obj: { [key:string]: any }) => Object.keys(obj).join(", ");
export default getObjectKeysList;