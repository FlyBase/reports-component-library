import React from 'react';
import './App.css';
import SplitSystemCombinationSearchTable from "./components/interactive-tables/SplitSystemCombinationSearchTable";

/*
* This file is for local development only
* */

function App() {
  return (
    <div>
        <SplitSystemCombinationSearchTable expression={{ anatomy: "alpha/beta surface Kenyon cell" }}/>
    </div>
  );
}

export default App;
