import React from "react";
import {markdown} from "markdown";

export default React.createClass({
    descriptionMarkup() {
        return markdown.toHTML(this.props.app.model.activeItem.description);
    },
    render() {
        const {title, description} = this.props.app.model.activeItem;

        return <div className="raw">
            <div className="title">{title}</div>
            <div className="description" dangerouslySetInnerHTML={{__html: this.descriptionMarkup()}} />
        </div>;
    }
});
