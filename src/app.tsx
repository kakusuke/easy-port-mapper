import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from "./components/Main";
import { RecoilRoot } from "recoil";

function render() {
    ReactDOM.render(<RecoilRoot><Main/></RecoilRoot>, document.getElementById('container'));
}

render();