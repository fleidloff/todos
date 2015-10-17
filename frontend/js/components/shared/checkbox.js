import React from "react";
import Icon from "react-fontawesome";

export default React.createClass({
      render() {
        console.log("checked", this.props.checked);
        return <Icon className="checkbox" onClick={this.props.onClick} name={this.props.checked ? "check-square-o" : "square-o"} />;
    }
});
