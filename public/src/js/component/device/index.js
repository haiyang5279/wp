/**
 * Created by 28652 on 2016/1/27.
 */

import List from './list';

class Device extends React.Component {
    render() {
        return (
            <div>
                Device
                {this.props.children || <List />}
            </div>
        )
    }
}

module.exports = Device;