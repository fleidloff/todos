import React from "react";
import Icon from "react-fontawesome";

export default React.createClass({
      render() {
        return <Icon className="checkbox" onClick={this.props.onClick} name={this.props.checked ? "check-square-o" : "square-o"} />;
    }
});
