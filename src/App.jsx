import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import {AppIndex} from './AppIndex.jsx';
import {AppAbout} from './AppAbout.jsx';


class App extends React.Component {


    constructor(props, context) {
        super(props, context);

        APP.INST = this;

        this.state = {
	  
        };
    }


    render() {
        return  <div className="app">
            <nav id="nav" className="navbar navbar-default navbar-fixed-top">
                <h1 className="navbar-header">
                    Tubity-UI
                </h1>
                <ul className="nav navbar-nav pull-right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="https://github.com/Jarosh/tubity-ui" target="_blank">GitHub</a></li>
                </ul>
            </nav>
            <div id="app">
                {React.cloneElement(this.props.children, { app: this })}
            </div>
        </div>
    }


}


try {
    ReactDOM.render((<Router history={ window.location.protocol.match(/^https?:?$/) ? browserHistory : hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={AppIndex}/>
            <Route path="about" component={AppAbout}/>
            <Route path="*" component={AppIndex}/>
        </Route>
    </Router>), document.getElementById('tubity-ui'));
} catch(exc) {
    throw exc;
}
