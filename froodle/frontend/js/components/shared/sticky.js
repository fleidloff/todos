import React from "react";
import ReactDOM from "react-dom";
import Sticky from "react-sticky";

export default React.createClass({
    getInitialState() {
        window.addEventListener("scroll", this.stickyIfNeeded);
        window.addEventListener("resize", this.stickyIfNeeded);

        return {style: {}};
    },
    stickyIfNeeded(e) {
        if(!(this.isMounted())) {
            return;
        }
        const scrollUp = this.scrollUp(e);
        const el = ReactDOM.findDOMNode(this);
        const pos = this.getPos(el);
        const scroll = this.getScroll();

        if (scrollUp) {
            this.stickyScrollUp(el, pos, scroll);
        } else {
            this.stickyScrollDown(el, pos, scroll);
        }
    },
    stickyScrollUp(el, pos, scroll) {
        if ((pos.y - scroll.y) >= -56) {
            this.unSticky();
        }
    },
    stickyScrollDown(el, pos, scroll) {
        if (this.bottomVisible(el) && (pos.y - scroll.y) < 8) {
            this.sticky();
        }
    },
    bottomVisible(el) {
        const height = el.offsetTop + el.offsetHeight;
        const windowHeight = window.screen.availHeight;
        const scroll = this.getScroll();

        if (windowHeight - scroll.y - height > 0) {
            return true;
        } 
    },
    scrollUp(e) {
        const scroll = this.getScroll();
        if (!this.lastScroll) {
            this.lastScroll = scroll;
            return false;
        }
        if (scroll.y > this.lastScroll.y) {
            this.lastScroll = scroll;
            return false;
        }
        this.lastScroll = scroll;
        return true;
    },
    unSticky() {
        this.setState({style:{}});
    },
    sticky() {
        this.setState({
            style: {
                position: "fixed",
                width: "inherit",
                top: "0" // parent height
            }
        });
    },
    getScroll() {
        return {
            x: window.scrollX,
            y: window.scrollY
        }
    },
    getPos(el) {
        for (var lx=0, ly=0;
             el != null;
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {
            x: lx,
            y: ly
        };
    },
    componentWillReceiveProps(newProps) {
        if(!!(this.props.children !== newProps.children)) {
            this.setState({style: {}});
        }    
    },
    renderChild() {
        return React.Children.only(this.props.children);
    },
    render() {
        return <div style={this.state.style}>
            {this.renderChild()}
        </div>;
    }
});
