import React from "react";

export default React.createClass({
    getInitialState() {
        return {
            clicked: false,
            t: null
        };
    },
    onClick(e) {
        e.stopPropagation();
        clearTimeout(this.t);
        if (this.state.clicked) {
            this.setState({clicked: false});
            return this.props.onConfirm();
        }
        this.setState({clicked: true});
        this.t = setTimeout(() => {
            this.setState({clicked: false});
        }, 3000);
    },
    componentWillUnmount() {
        clearTimeout(this.t);
    },
    render() {
        const text = this.state.clicked ? (this.props.confirmText || `${("confirm " + this.props.text)}`) : this.props.text
        return <button onClick={this.onClick} className={this.props.className}>{text}</button>;
    }
});
