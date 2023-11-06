import {Reducer, useReducer} from "react";
import axios from "axios";

type apiState<ResponseType> = {
    response: null | ResponseType,
    isLoading: boolean,
};

type genericAction = {
    type: string,
};

type apiRequestAction<RequestType> = genericAction & {
    type: "request",
    body?: RequestType,
    queryParams?: string
};

type apiResponseAction<RequestType> = genericAction & {
    type: "response",
    data: RequestType
}

type apiAction<DataType = any> = apiRequestAction<DataType> | apiResponseAction<DataType>;

const apiReducer = <ResponseType>(state: apiState<ResponseType>, action: apiAction): apiState<ResponseType> => {
    if(action.type === "request") return {...state, isLoading: true};
    if(action.type === "response") return {
        response: action.data,
        isLoading: false
    };
    return state;
};

const toQueryString = (params: { [key: string]: any }) => "?"+Object.keys(params).map(key => `${key}=${encodeURI(params[key])}`).join(",");

type useAPIResponseType<ResponseType> = apiState<ResponseType> & {
    loadData: () => void,
}

export const useAPI = <RequestType = {}, ResponseType = {}>(url: string, requestBody?: RequestType, queryParams?: { [key: string]: any }): useAPIResponseType<ResponseType>  => {
    const [query, dispatch] = useReducer<Reducer<apiState<ResponseType>, apiAction>>(apiReducer, {
        response: null,
        isLoading: false
    });

    const loadData = () => {
        if(query.response === null && !query.isLoading) {
            dispatch({
                type: "request",
                ...(requestBody ? { body: requestBody } : "")
            });
            axios.get(url+(queryParams ? toQueryString(queryParams) : ""))
                .then(response => dispatch({ type: "response", data: response.data }));
        }
    };

    return { ...query, loadData };
};















