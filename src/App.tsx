import React from 'react';
import './App.css';
import MastodonFeed from "./components/SocialFeed/MastodonFeed";

/*
* This file is for local development only
* */

function App() {


  return (
    <div style={{ maxWidth: "600px", maxHeight: "500px" }}>
        <MastodonFeed server="mastodon.social" accountHandle="FlyBase" domain="mstdn.science" limit={10} />
    </div>
  );
}

export default App;
