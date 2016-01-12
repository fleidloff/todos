import React from "react";

export default React.createClass({
    render() {
        if ((this.props.app.model.pageName || "default") !== this.props.name) {
            return <div />;
        }

        return <div>
            {React.Children.map(this.props.children, r => React.cloneElement(r, {app: this.props.app}))}
        </div>;
    }
});
