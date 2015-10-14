import React from "react";
import keyToColor from "../../util/keyToColor";

export default React.createClass({
    render() {
        const {title, description, active, sort, checked, id} = this.props.data;
        const simpleDescription = description.replace(/[^a-zA-Z .,]/g, "");
        const style = {"borderLeft": `4px solid ${keyToColor(title)}`};
        return <div onClick={this.props.app.onTrigger("select:item", id)} style={style} className={"item" + (active ? " active" : "") + (checked ? " checked" : "")}>
            <input onClick={e => false} onChange={this.props.app.onTrigger("check:item", id, !checked)} type="checkbox" className="checkbox" checked={checked} />
            <div className="title">{title}</div>
            <div>{(simpleDescription.length > 20) ? (simpleDescription.substring(0, 20) + "...") : simpleDescription}&nbsp;</div>
            <div className="arrow arrow-right"></div>
        </div>;
    }
});
