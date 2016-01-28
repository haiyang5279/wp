/**
 * Created by 28652 on 2016/1/26.
 */

import React from 'react';

const NotFound = React.createClass({
    render() {
        return (
            <div>
                404
                NotFound
            </div>
        )
    }
});

module.exports = {
    path: '*',
    component: NotFound
}