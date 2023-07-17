import Ribbon, {RGBValue, RibbonComponentProps, RibbonData} from '@flybase/react-ontology-ribbon';
import '@flybase/react-ontology-ribbon/dist/style.css';
import React from "react";

/*
* This component is mostly taken from the original ribbons code on the FlyBase Server.
* It implements @flybase/react-ontology-ribbon for the ribbons themselves.
* */


export type ReportRibbonProps = Omit<RibbonComponentProps, 'data' | 'title' | 'calcHeatColor' | 'itemTitle'> & {
    id: string,
    ontology: string,
    aspect: string,
    data: RibbonData[]
}
const grey: RGBValue = [220, 220, 220],
    white: RGBValue = [255, 255, 255],
    blue: RGBValue = [0, 127, 155],
    ltblue: RGBValue = [220, 230, 255],
    ylw: RGBValue = [240, 240, 120],
    maroon: RGBValue = [128, 0, 0];
const binaryRGB: RGBValue = blue;


const ReportRibbon: React.FC<ReportRibbonProps> = ({id, ontology, aspect, data, ...ribbonComponentProps}) => {

    let ribbonTitle = aspect.replace(/_/, ' ')
    if( ribbonTitle === 'flycellatlas') ribbonTitle = 'adult cell types - Fly Cell Atlas scRNA-seq'
    if (aspect === 'anatomy') {
        ribbonTitle += ' - manually curated'
    }
    if (aspect === 'stages') {
        ribbonTitle += ' - modENCODE RNA-seq'
    }


    const customGradient: RibbonComponentProps["calcHeatColor"] = ({ numTerms, heatLevels, itemData }) => {
        // custom calcHeatColor needs to deal with zero-term case explicitly
        if (numTerms === 0) return aspect === 'stages' ? grey : white; // to correspond with grey "limit of detection" color in proteome plots
        if (aspect === 'anatomy') return binaryRGB;

        const bin = (aspect === 'stages' || ontology === 'disease') ? itemData.descendant_terms.length : itemData.num_annotations - 1;

        if (aspect === 'flycellatlas')
            return ltblue.map(function (v, i) {
                return v - bin*Math.round((v - maroon[i])/heatLevels)
            }) as RGBValue;
        else if (ontology === 'go' || ontology === 'disease')
            return white.map(function (w, i) {
                return w - (bin + 1) * Math.round((w - blue[i]) / (heatLevels - 2))
            }) as RGBValue;
        return ylw.map(function (v, i) {
            return v - bin * Math.round((v - maroon[i]) / (heatLevels - 2))
        }) as RGBValue;
    }

    return (
        <Ribbon
            data={data}
            title={ribbonTitle}
            itemTitle={data => {
                if (aspect === 'stages') return null
                if( aspect.match(/modENCODE|FlyAtlas/) ) {
                    return data.descendant_terms.length;
                }
                return (
                    data.name.toUpperCase() +
                    ':' +
                    data.descendant_terms
                        .map((childTermObj, i) =>
                            childTermObj.name ? '\n ' + childTermObj.name : null
                        )
                        .join('')
                )
            }}
            calcHeatColor={customGradient}
            {...ribbonComponentProps}
        />
    );
};

export default ReportRibbon;