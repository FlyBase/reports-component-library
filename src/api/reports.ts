import {useEffect, useReducer} from "react";
import axios from "axios";
import {RibbonData} from "@flybase/react-ontology-ribbon";

const isHTData = (ontology: string, aspect: string) => ontology === 'expression' && !['anatomy', 'stages', 'flycellatlas'].includes(aspect);

const getHTData = (ontology: string, aspect: string, id: string) => axios.get(`${process.env.REACT_APP_API_BASE_URL}/${ontology}/ht_data/${id}/${aspect}`).then(response => {
    const data = response.data;
    data.resultset = {};
    data.resultset.result = [];
    let slim_order: string[] = [];
    let ribbon: { [key: string]: RibbonData } = {};
    for( let cat = 0; cat < data.expression.length; cat++ ) {
        let catName: string = data.expression[cat].Category_Name;
        // create slim_order array
        slim_order.push( catName );
        // create ribbon object
        ribbon[catName] = {
            descendant_terms: [],
            name: catName,
            id,
            num_annotations: 0
        };

        for( let i=1; i<data.expression[cat].BinID; i++ ) {        // set length by intensity
            ribbon[catName].descendant_terms.push( { 'id' : "bin "+data.expression[cat].BinID, 'name' : "bin "+i } );
        }
    }
    data.resultset.result.push( { 'slim_ids_order' : slim_order, 'ribbon' : ribbon } );
    return response;
});

const getApiData = (ontology: string, aspect: string, id: string) => axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ribbon/${ontology}/${aspect}/${id}`);

export interface ReportRibbonReducerState {
    data: RibbonData[];
    isLoading: boolean;
    isLoaded: boolean;
    error?: Error;
}

enum ReportRibbonReducerActionType {
    REQUEST,
    SUCCESS,
    ERROR
}

export interface ReportRibbonReducerAction {
    type: ReportRibbonReducerActionType;
    error?: Error;
    data?: RibbonData[];
}

const getData = (ontology: string, aspect: string, id: string): Promise<RibbonData[]> => {
    const getData = isHTData(ontology, aspect) ? getHTData : getApiData;

    return getData(ontology, aspect, id).then(response => {
        const data = response.data;
        let ontologyData = [];
        /* for now, include a structural conversion:
         { keyID: { name: "name", descendant_terms: [] }, etc } into [ { id: "ID", name: "name", descendant_terms: [] }, etc ] */
        let slim_order = data.resultset.result[0].slim_ids_order
        let termsObj = data.resultset.result[0].ribbon // console.log(termsObj);
        for (let id = 0; id < slim_order.length; id++) {
            let termID = slim_order[id]
            //console.log("getting data for "+termID);;
            ontologyData.push({
                id: termID,
                name: termsObj[termID].name,
                num_annotations: termsObj[termID].num_annotations,
                descendant_terms: termsObj[termID].descendant_terms,
            })
        }
        // hack to convert curation data into binary "yes" or "no" in the ribbon display
        if (ontology === 'expression' && (aspect === 'anatomy'/* || aspect === 'flycellatlas'*/)) {
            for (let termObj of ontologyData) {
                let descTerms = termObj.descendant_terms.length
                if (descTerms > 0) {
                    for (let i = 8; i > descTerms; i--)
                        termObj.descendant_terms.push({id: 'ID' + i, name: ''})
                }
            }
        }
        // console.log(ontologyData);
        return ontologyData;
    });
};


const getInitialReducerState = (data: RibbonData[]) => ({
    data,
    isLoading: true,
    isLoaded: false
});

const reducer = (prevState: ReportRibbonReducerState, action: ReportRibbonReducerAction): ReportRibbonReducerState => {
    switch (action.type) {
        case ReportRibbonReducerActionType.SUCCESS: return { data: action.data!, isLoading: false, isLoaded: true };
        case ReportRibbonReducerActionType.ERROR: return { error: action.error, isLoading: false, isLoaded: true, data: prevState.data };
        default: return prevState;
    }
};

export const useReportsAPI = (ontology: string, aspect: string, id: string) => {

    const [reducerState, updateRibbonData] = useReducer(reducer, [], getInitialReducerState);

    useEffect(() => {
        getData(ontology, aspect, id).then(
            data => updateRibbonData({
                type: ReportRibbonReducerActionType.SUCCESS,
                data
            }),
            error => updateRibbonData({
                type: ReportRibbonReducerActionType.ERROR,
                error
            })

        );
    }, [ontology, aspect, id]);

    return reducerState;
};

export type RibbonRequest = {
    ontology: string,
    aspect: string,
    id: string
};

interface RibbonReducerState {
    responses: (RibbonData[] | string)[],
    isLoading: boolean,
    allLoaded: boolean
}

type RibbonReducerAction = {
    type: "request" | "response" | "init",
    data?: (RibbonData[] | string)[]
};

const ribbonReducer = (state: RibbonReducerState, action: RibbonReducerAction): RibbonReducerState => {
    if(action.type === "request") return {...state, isLoading: true};
    return {
        responses: action.data!,
        isLoading: false,
        allLoaded: true
    };
};

export const useRibbonsAPI = (ribbonRequests: RibbonRequest[]): RibbonReducerState & { loadData: () => void } => {
    const [query, dispatch] = useReducer(ribbonReducer, {
        responses: [],
        isLoading: false,
        allLoaded: false
    });

    const loadData = () => {
        dispatch({
            type: "request"
        });
        Promise.allSettled(
            ribbonRequests.map(request => getData(request.ontology, request.aspect, request.id))
        ).then(responses => {
            dispatch({
                type: "response",
                data: responses.map(response => response.status === 'fulfilled' ? response.value : response.reason)
            });
        });
    };

    return {
        ...query,
        loadData
    };
};