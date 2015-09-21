import React from "react";

let t;
export default React.createClass({
    getInitialState() {
        return {
            clicked: false
        };
    },
    onClick() {
        clearTimeout(t);
        if (this.state.clicked) {
            return this.props.onConfirm();
        }
        this.setState({clicked: true});
        t = setTimeout(() => {
            this.setState({clicked: false});
        }, 3000);
    },
    componentWillUnmount() {
        clearTimeout(t);
    },
    render() {
        const text = this.state.clicked ? `confirm ${this.props.text}` : this.props.text
        return <button onClick={this.onClick} className={this.props.className}>{text}</button>;
    }
});
