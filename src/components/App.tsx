import * as React from "react";
import SignIn from './Auth/Auth';
import Router from './Router/Router'
import {Provider} from 'react-redux';
import store from '../store'


export class App extends React.Component<any> {
    
    render() {
        console.log(store.getState())
         return (
            <Provider store={store}>
                <Router />
            </Provider>
            )
    }
}