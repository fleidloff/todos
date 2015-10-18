import React from "react";
import Icon from "react-fontawesome";


let id = 0;
export default React.createClass({
    onClick(id) {
        return () => this.props.app.trigger("dismiss:notification", id);
    },
    renderNotifications() {
        return this.props.app.model.notifications
            .map(m => {
                if (m.type) {
                    if (m.type === "warning") {
                        m.className = "message-warning";
                    }
                } else {
                    m.className = "";
                }
                return m;
            })
            .map((m, i) => {
                const className = "pure-g message " + m.className;
                return <div key={m.id} className={className}>
                    <div className="pure-u-11-12">
                        {m.content}
                    </div>
                    <div onClick={this.onClick(m.id)} className="pure-u-1-12 align-right pointer">
                        <Icon name="remove" />
                    </div>
                </div>;
            })
    },
    render() {
        return <div>
            {this.renderNotifications()}
        </div>;
    }
});
