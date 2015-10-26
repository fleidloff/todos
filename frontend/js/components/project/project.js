import React from "react";
import Items from "./items";
import Item from "./item-detail";
import Sticky from "../shared/sticky";

export default React.createClass({
    render() {
        return <div className="pure-g project">
            <div className="pure-u-1-2">
                <Sticky>
                    <Items app={this.props.app} />
                </Sticky>
            </div>
            <div className="pure-u-1-2">
                <Sticky>
                    <Item app={this.props.app} />
                </Sticky>
            </div>
        </div>;
    }
});
