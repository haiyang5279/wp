/**
 * Created by 28652 on 2016/1/25.
 */

var Entry = React.createClass({

    render: function(){
        return (
            <div className="list-bd-entry">
                {JSON.stringify(this.props.d)}
            </div>
        );
    }
});

var List = React.createClass({

    render: function(){
        var tmp = this.props.list.map(function(o){
            return(
                <Entry d={o} />
            );
        });

        return (
            <div className="list-bd">
                {tmp}
            </div>
        );
    }
});

module.exports = List;