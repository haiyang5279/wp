/**
 * Created by 28652 on 2016/1/27.
 */



class Main extends React.Component {
    render() {
        return (
            <div id="main" className="g-mn">
                {this.props.child}
            </div>
        )
    }
}

module.exports = Main;