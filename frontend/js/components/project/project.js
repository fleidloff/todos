import React from "react";
import Items from "./items";
import Item from "./item-detail";

export default React.createClass({
    render() {
        return <div className="pure-g project">
            <div className="pure-u-1-2">
                <Items app={this.props.app} />
            </div>
            <div className="pure-u-1-2">
                <Item app={this.props.app} />
            </div>
        </div>;
    }
});
