import React from "react";
import Items from "./items";
import Item from "./item-detail";
import Footer from "./footer";

export default React.createClass({
    render() {
        return <div className="pure-g project">
            <div className="pure-u-1-3">
                <Items app={this.props.app} />
            </div>
            <div className="pure-u-2-3">
                <Item app={this.props.app} />
            </div>
            <div className="pure-u-1">
                <Footer app={this.props.app} />
            </div>
        </div>;
    }
});
