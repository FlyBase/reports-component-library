import {JSXElementConstructor, ReactElement} from "react";
import ReactDOM from "react-dom";

interface Injection {
    containerId: string,
    component: ReactElement<string | JSXElementConstructor<any>>
}

const injectComponents = (injections: Injection[]) => {
    injections.forEach(injection => {
       const container = document.getElementById(injection.containerId);
       if(!container) {
           console.error(`No container with id "${injection.containerId}" found.`);
       }
       ReactDOM.render(injection.component, container);
    });
};

export default injectComponents;