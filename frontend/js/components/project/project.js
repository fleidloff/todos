import React from "react";
import Items from "./items";
import Item from "./item-detail";
import Sticky from "../shared/sticky";
import ItemActions from "./itemActions";

export default React.createClass({
    render() {
        return <div className="pure-g project">
            <div className="pure-u-md-2-5 pure-u-lg-1-4 pure-u-1-2">
                <ItemActions app={this.props.app} />
                <Sticky>
                    <Items app={this.props.app} />
                </Sticky>
            </div>
            <div className="pure-u-md-3-5 pure-u-lg-3-4 pure-u-1-2">
                <Sticky>
                    <Item app={this.props.app} />
                </Sticky>
            </div>
        </div>;
    }
});
