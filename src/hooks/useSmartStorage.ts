import {useCallback, useEffect, useReducer} from "react";
import getByPath from "../helpers/getByPath";
import getObjectKeysList from "../helpers/getObjectKeysList";

const initializeReducer = (rootPath: string) => {
    const localStorageKey = rootPath.substring(0, rootPath.indexOf(".")) || rootPath;

    let fullValue = window.localStorage.getItem(localStorageKey);
    fullValue = fullValue === null ? {} : JSON.parse(fullValue);

    const childValue = getByPath(fullValue, rootPath.substring(localStorageKey.length), true);

    if(JSON.stringify(fullValue) !== window.localStorage.getItem(localStorageKey)) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(fullValue || {}));
    }

    return childValue;
};

const reducer = (state: any, action: { rootPath: string, newValue: any, replaceAll?: boolean, message?: string }) => {

    if(JSON.stringify(state) === JSON.stringify(action.newValue)) return state;

    const localStorageKey = action.rootPath.substring(0, action.rootPath.indexOf(".")) || action.rootPath;

    let fullValue = window.localStorage.getItem(localStorageKey);
    fullValue = fullValue === null ? {} : JSON.parse(fullValue);

    const parentPath = action.rootPath.substring(localStorageKey.length + 1, action.rootPath.lastIndexOf(".")) || action.rootPath;
    const keyToUpdate = action.rootPath.substring(action.rootPath.lastIndexOf(".") + 1);
    let childPathObject = getByPath(fullValue, parentPath);

    if(action.replaceAll) {
        return parentPath === keyToUpdate ? childPathObject : childPathObject[keyToUpdate];
    } else {
        if(parentPath === keyToUpdate) {
            fullValue = action.newValue;
        } else {
            if(action.newValue === undefined) {
                delete childPathObject[keyToUpdate];
            } else {
                childPathObject[keyToUpdate] = action.newValue;
            }
        }
    }

    return action.newValue;
};

const useSmartStorage = (rootPath: string): [any, (path: string, newValue: any) => void, (path: string) => void] => {

    const [value, setValue] = useReducer(reducer, rootPath, initializeReducer);

    const localStorageKey = rootPath.substring(0, rootPath.indexOf(".")) || rootPath;

    useEffect(() => {

            let fullValue = window.localStorage.getItem(localStorageKey);
            fullValue = fullValue === null ? {} : JSON.parse(fullValue);
            const parentPath = rootPath.substring(localStorageKey.length + 1, rootPath.lastIndexOf(".")) || rootPath;
            const keyToUpdate = rootPath.substring(rootPath.lastIndexOf(".") + 1);
            let childPathObject = getByPath(fullValue, parentPath);
            childPathObject[keyToUpdate] = value;
            window.localStorage.setItem(localStorageKey, JSON.stringify(fullValue));
            window.dispatchEvent(new CustomEvent('localStorage'));

    }, [localStorageKey, rootPath, value]);

    const updateValue = useCallback((event: Event) => {
        const realValue = getByPath(JSON.parse(window.localStorage.getItem(localStorageKey)!), rootPath.substring(localStorageKey.length) || rootPath);
        if(JSON.stringify(realValue) !== JSON.stringify(value)) {
            setValue({
                rootPath,
                newValue: window.localStorage.getItem(localStorageKey),
                replaceAll: true
            });
        }
    }, [value, rootPath, localStorageKey]);

    useEffect(() => {
        window.addEventListener('localStorage', updateValue);
        return () => window.removeEventListener('localStorage', updateValue);
    }, [setValue, rootPath, localStorageKey, updateValue]);

    const updateStorage = (path: string, newValue: any) => {
        let newObject = JSON.parse(JSON.stringify(value));

        const parentPath = path.substring(0, path.lastIndexOf(".")) || path;
        const keyToUpdate = path.substring(path.lastIndexOf(".") + 1);

        let pathObject = parentPath === keyToUpdate ? newObject : getByPath(newObject, parentPath, true);

        const match = /(.*)\[(\d*)]$/.exec(keyToUpdate);
        if(match) {
            const [, arrayKey, arrayIndex] = match;
            if( arrayKey !== "" && pathObject[arrayKey] === undefined) {
                pathObject[arrayKey] = [];
            }
            if(arrayIndex) {
                pathObject[arrayKey][arrayIndex] = newValue;
            } else {
                pathObject[arrayKey].push(newValue);
            }
        } else {
            if(keyToUpdate === "") {
                newObject = newValue;
            } else {
                pathObject[keyToUpdate] = newValue;
            }
        }

        setValue({rootPath, newValue: newObject});
    };

    const deleteStorage = (path = "") => {
        let newObject = JSON.parse(JSON.stringify(value));

        const parentPath = path.substring(0, path.lastIndexOf(".")) || path;
        const keyToUpdate = path.substring(path.lastIndexOf(".") + 1);

        let pathObject = parentPath === keyToUpdate ? newObject : getByPath(newObject, parentPath);

        const match = /(.*)\[(\d*)]$/.exec(keyToUpdate);
        if(match) {
            const [, arrayKey, arrayIndex] = match;
            pathObject = pathObject[arrayKey];
            if(arrayIndex) {
                pathObject.splice(arrayIndex,1);
            } else {
                throw new Error('An array index must be provided to delete.');
            }
        } else {
            if(keyToUpdate === "") {
                newObject = undefined;
            } else {
                delete  pathObject[keyToUpdate];
            }
        }

        setValue({rootPath, newValue: newObject});
    };

    return [value, updateStorage, deleteStorage];
};

export default useSmartStorage;