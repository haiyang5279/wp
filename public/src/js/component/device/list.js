/**
 * Created by 28652 on 2016/1/27.
 **/

import {Link} from 'react-router';
import '../../../css/u.table.less';
import '../../../css/u.ico.less';

class Entry extends React.Component {
    render() {
        return (
            <tr>
                <td>11111</td>
                <td>{this.props.d.id}</td>
                <td><Link to={"/device/" + this.props.d.id} ><ico className="ico ico-edit" />detail</Link></td>
            </tr>
        )
    }
}
class List extends React.Component {
    getList() {
        let arr = [
            {id: 1}, {id: 2}
        ]
        return arr.map( (o) => {
            return <Entry d={o} />
        } );
    }

    render() {
        return (
            <div>
                <p>Device.list</p>
                <table className="u-table">
                    <thead>
                        <tr>
                            <th>1</th>
                            <th>1</th>
                            <th>1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

module.exports = List;