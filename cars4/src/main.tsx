import React from 'react'
import { StrictMode } from "react";

import App from './App'
import './index.css'
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
