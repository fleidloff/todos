import React from "react";
import manipulator from "../../util/manipulator";


export default React.createClass({
    descriptionMarkup() {
        return manipulator
            .input(this.props.app.model.activeItem.description)
            .applyAll();
    },
    render() {
        const {title, description} = this.props.app.model.activeItem;

        return <div className="raw">
            <div className="title">{title}</div>
            <div className="description" dangerouslySetInnerHTML={{__html: this.descriptionMarkup()}} />
        </div>;
    }
});
