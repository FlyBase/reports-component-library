import {JSXElementConstructor, ReactElement} from "react";
import ReactDOM from 'react-dom/client';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createFragmentRegistry} from "@apollo/client/cache";
import FullAllele from "../api/graphql/fragments/fullAllele";

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache({
        fragments: createFragmentRegistry(FullAllele),
    })
});

interface Injection {
    containerId: string,
    component: ReactElement<string | JSXElementConstructor<any>>
}

//loop through and inject components into containers with corresponding ids
const injectComponents = (injections: Injection[]) => {
    injections.forEach(injection => {
       const container = document.getElementById(injection.containerId);
       if(!container) {
           console.error(`No container with id "${injection.containerId}" found.`);
       }
        const root = ReactDOM.createRoot(
            container as HTMLElement
        );
        root.render(
            <ApolloProvider client={client}>
                {injection.component}
            </ApolloProvider>
        );
    });
};

export default injectComponents;