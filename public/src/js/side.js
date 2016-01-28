
import List from './side.list.js';
import '../css/side.less';

var Side = React.createClass({
    getInitialState: function(){
        return {
            boxFlag: false,
            selectId: 0,
            list: []
        };
    },

    click: function(){
        this.setState({
            boxFlag: !this.state.boxFlag
        })
    },

    getList: function(){
        this.setState({
            list: [
                {name: 'fff', id: this.state.selectId}
            ]
        })
    },

    getTypeList: function(){
        var w = this;
        var list = [
            {name: 'text1', id: 1, key: 1},
            {name: 'text2', id: 2, key: 2}
        ];

        var tmp = list.map(function(o){
            return (
                <li onClick={w.itemClick} data-id={o.id}>{o.name}</li>
            );
        });

        return (
            <ul>{tmp}</ul>
        );
    },

    itemClick: function(e){
        this.setState({
            boxFlag: false,
            selectId: e.target.dataset.id
        }, function(){
            this.getList();
        });
    },

    render: function(){
        return (
            <div>
                <div className="list-hd">
                    <div className="list-hd-tit" onClick={this.click}>{this.props.title}</div>
                </div>
                <div className={this.state.boxFlag ? 'list-hd-box' : 'hide'} >{this.getTypeList()}</div>
                <List list={this.state.list}/>
            </div>
        );
    }
});

ReactDOM.render(
    <Side title="测试"/>,
    document.getElementById('list')
);