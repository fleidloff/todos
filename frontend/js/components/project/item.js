import React from "react";

export default React.createClass({
    onClick(e) {
        e.preventDefault();
        app.trigger("select:item", this.props.data.id);
    },
    render() {
        const {title, description, active} = this.props.data;
        const simpleDescription = description.replace(/[^a-zA-Z .,]/g, "")
        return <div onClick={this.onClick} className={"item" + (active ? " active" : "")}>
            <div className="title">{title}</div>
            <div>{(simpleDescription.length > 20) ? (simpleDescription.substring(0, 20) + "...") : simpleDescription}&nbsp;</div>
            <div className="arrow arrow-right"></div>
        </div>;
    }
});
