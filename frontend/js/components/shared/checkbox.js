import React from "react";
import Icon from "react-fontawesome";

export default React.createClass({
    onClick(e) {
        e.target={value: !this.props.checked};
        return this.props.onClick(e);
    },
    renderTitle() {
        if (this.props.title) {
            return <span>{this.props.title}</span>;
        }
    },
    render() {
        return <div onClick={this.onClick} className="checkbox">
            {this.renderTitle()}
            <Icon name={this.props.checked ? "check-square-o" : "square-o"} />
        </div>;
    }
});
