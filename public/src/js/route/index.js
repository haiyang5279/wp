/**
 * Created by 28652 on 2016/1/26.
 */

import { Router, Route, Link, IndexRoute, IndexLink, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const root = [
    {
        path: '/',
        component: require('../component/app'),
        indexRoute: require('./dashboard'),
        childRoutes: [
            require('./device')
        ]
    },
    require('./404')
]

ReactDOM.render(
    <Router history={createBrowserHistory()} routes={root} />
    , document.getElementById('app'));