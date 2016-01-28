/**
 * Created by 28652 on 2016/1/27.
 */

module.exports = {
    path: 'device',
    //component: require('../component/device'),

    childRoutes: [
        {
            path: ':id',
            getComponents(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../component/device/detail'))
                })
            }
        }
    ],

    getComponents(location, callback) {
        require.ensure([], (require) => {
            callback(null, require('../component/device'))
        })
    }
};