import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import MastodonFeed from "./components/SocialFeed/MastodonFeed";

/*
* This file is for local development only
* */

function App() {


  return (
    <div>
        <MastodonFeed server="mstdn.science" accountHandle="FlyBase" />
    </div>
  );
}

export default App;
