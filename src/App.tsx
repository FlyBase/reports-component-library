import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import GOSummaryRibbonsSection from "./sections/GOSummaryRibbonsSection";
import useBlinds from "./hooks/useBlinds";
import getObjectKeysList from "./helpers/getObjectKeysList";
import DiseaseModelSummaryRibbonSection from "./sections/DiseaseModelSummaryRibbonSection";
import ExpressionSummaryRibbonsSection from "./sections/ExpressionSummaryRibbonsSection";

/*
* This file is for local development only
* */

const nodes = [
    {
        ontology: 'expression',
        aspect: 'anatomy'
    },{
        ontology: 'expression',
        aspect: 'stages'
    },{
        ontology: 'expression',
        aspect: 'flycellatlas'
     },{
        ontology: 'expression',
        aspect: 'FlyAtlas'
    },{
        ontology: 'expression',
        aspect: 'modENCODE_mRNA-Seq_tissues'
    },{
        ontology: 'expression',
        aspect: 'modENCODE_mRNA-Seq_development'
    },{
        ontology: 'expression',
        aspect: 'modENCODE_mRNA-Seq_cell_B'
    },{
        ontology: 'expression',
        aspect: 'modENCODE_mRNA-Seq_treatments'
    },{
        ontology: 'disease',
        aspect: 'all'
    },{
        ontology: 'disease',
        aspect: 'infection'
    },{
        ontology: 'disease',
        aspect: 'anatomical_entity'
    },{
        ontology: 'disease',
        aspect: 'proliferation'
    },{
        ontology: 'disease',
        aspect: 'other'
    },{
        ontology: 'go',
        aspect: 'molecular_function'
    },{
        ontology: 'go',
        aspect: 'biological_process'
    },{
        ontology: 'go',
        aspect: 'cellular_component'
    }
];

function App() {

    const { blinds, toggleBlind } = useBlinds('reports');

  return (
    <div style={{padding: "15px", width: "90vw"}}>
        App: {getObjectKeysList(blinds)}
        <GOSummaryRibbonsSection reportId="FBgn0039044" />
        <ExpressionSummaryRibbonsSection reportId="FBgn0039044" />
        <DiseaseModelSummaryRibbonSection reportId="FBgn0039044" />
        {/*{*/}
        {/*    nodes.map(node => <ReportRibbon id="FBgn0002719" ontology={node.ontology} aspect={node.aspect}/>)*/}
        {/*}*/}
    </div>
  );
}

export default App;
