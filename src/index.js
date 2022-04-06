import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';   
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './redux/reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import './scss/app.scss'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)