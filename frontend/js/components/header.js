import React from "react";


export default React.createClass({
    onClickNew() {
        this.props.app.trigger("new:item");
    },
    render() {
        return <div className="pure-g header">
            <div className="pure-u-2-3">
                <button onClick={this.onClickNew} className="pure-button button-success">new item</button>
            </div>
            <div className="pure-u-1-3 title align-right">froodle</div>
        </div>;
    }
});
