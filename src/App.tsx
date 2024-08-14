import React from 'react';
import './App.css';
import InteractiveTable from "./components/interactive-tables/InteractiveTable";
import SplitSystemCombinationSearchTable from "./components/interactive-tables/SplitSystemCombinationSearchTable";

/*
* This file is for local development only
* */

function App() {

    const example = {
        alleles: [{
            id: "A1",
            gene: {
                id: "G1",
                constructs: [{
                    id: "C1",
                    insertions: [{
                        id: "I1"
                    },{ id: "I1.1"}]
                }]
            }
        },{
            id: "A2",
            gene: {
                id: "G2",
                constructs: [{
                    id: "C2",
                    insertions: [{
                        id: "I2"
                    }]
                }]
            }
        },{
            id: "A3",
            gene: {
                id: "G3",
                constructs: [{
                    id: "C3",
                    insertions: [{
                        id: "I3"
                    }]
                }]
            }
        }]
    };

    // console.log("EXAMPLE", getAllByPath2(example, "alleles.gene.constructs.id") );


  return (
    <div style={{ maxWidth: "600px", maxHeight: "500px" }}>
        <SplitSystemCombinationSearchTable expression={{ anatomy: "alpha/beta surface Kenyon cell" }}/>
    </div>
  );
}

export default App;
