import React from "react";
let id = 0;
export default React.createClass({
    getInitialState() {
        const {app} = this.props;
        app.on("show:message", (m, t) => {
            const notification = {
                content: m,
                type: t || "info",
                id: id++
            };
            const newNotifications = this.state.notifications;
            newNotifications.push(notification);
            this.setState({notifications: newNotifications});
        });
        return {
            notifications: []
        };
    },
    onClick(id) {
        return e => {
            const newNotifications = this.state.notifications.filter(n => n.id !== id);
            this.setState({notifications: newNotifications});
        }
    },
    renderNotifications() {
        return this.state.notifications
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
                        x
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
