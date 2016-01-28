/**
 * Created by 28652 on 2016/1/27.
 */

import React from 'react';
import Head from './layout/head';
import Side from './layout/side';
import Main from './layout/main';

class App extends React.Component {
    render() {
        return (
            <div class="g-app">
                <Head />
                <Side />
                <Main child={this.props.children} />
            </div>
        );
    }
}

module.exports = App;