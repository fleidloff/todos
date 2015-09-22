import React from "react";
import keyToColor from "../../util/keyToColor";

export default React.createClass({
    onClick(e) {
        e.preventDefault();
        this.props.app.trigger("select:item", this.props.data.id);
    },
    render() {
        const {title, description, active} = this.props.data;
        const simpleDescription = description.replace(/[^a-zA-Z .,]/g, "");
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div onClick={this.onClick} style={style} className={"item" + (active ? " active" : "")}>
            <div className="title">{title}</div>
            <div>{(simpleDescription.length > 20) ? (simpleDescription.substring(0, 20) + "...") : simpleDescription}&nbsp;</div>
            <div className="arrow arrow-right"></div>
        </div>;
    }
});
