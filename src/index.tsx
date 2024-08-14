import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createFragmentRegistry} from "@apollo/client/cache";
import FullAllele from "./api/graphql/fragments/fullAllele";

const client = new ApolloClient({
    uri: "http://seth-dev.flybase.org:7082/graphql",
    cache: new InMemoryCache({
        fragments: createFragmentRegistry(FullAllele),
    })
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>
);