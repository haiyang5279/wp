/**
 * Created by 28652 on 2016/1/26.
 */

import React from 'react';
import {IndexLink, Link } from 'react-router';

class Side extends React.Component {
    render() {
        return (
            <div id="side" className="g-sd">
                <ul>
                    <li><IndexLink to="/" activeClassName={"active"}>Dashboard</IndexLink></li>
                    <li><Link to="/device" activeClassName={"active"}>Device</Link></li>
                    <li><Link to="/device/34" activeClassName={"active"}>Device detail</Link></li>
                </ul>
            </div>
        )
    }
}

module.exports = Side;