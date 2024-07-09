
/*
* Define types for non-typescript libraries and global scripts here.
* */

declare module '@flybase/react-ontology-ribbon' {

    export type RGBValue = [number, number, number];

    export interface Term {
        id: string;
        name: string;
        num_annotations: number;
    }

    type Foo = "bar";

    type AnotherOne = {
        hey: "hello"
    };

    export interface RibbonData extends Term {
        descendant_terms: Omit<Term, 'num_annotations'>[];
    }

    export interface RibbonComponentProps {
        heatLevels?: number;
        baseRGB?: RGBValue;
        data: RibbonData[];
        noResults?: string | import('React').FC;
        title: string | import('React').FC;
        itemTitle: (data: RibbonData) => string | null | number;
        onTermClick?: (term: Term, event: import('React').MouseEvent<HTMLDivElement>) => any;
        calcHeatColor?: (args: { numTerms: number, baseRGB: RGBValue, heatLevels: number, itemData: RibbonData }) => RGBValue;
    }

    declare const Ribbon: import('React').FC<RibbonComponentProps>;

    export default Ribbon;

}

//Globals accessible on page
//Set in index.html for local development
declare var fb_rc: string;
declare var FBgn: string;
declare var FBgnSymbol: string;
