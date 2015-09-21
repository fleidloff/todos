import React from "react";
import Item from "./item";


export default React.createClass({
    getInitialState() {
        const {app} = this.props;
        app.on("loaded:items", items => this.setState({items}));
        app.on("select:item", active => this.setState({active}));

        return { 
            items: [],
            active: null
        };
    },

    initSort() {
        Sortable.create(this.getDOMNode(), {onSort: this.onSort});
    },

    onSortStart(evt) {
        const {oldIndex} = evt;
        const item = this.state.items.filter(i => i.sort === oldIndex)[0];
        if (item) {
            app.trigger("select:item", item.id);
        }
    },

    onSort(evt) {
        const {newIndex, oldIndex} = evt;
        const item = this.state.items.filter(i => i.sort === (this.state.items.length - oldIndex - 1))[0];
        if (item) {
            if (newIndex > oldIndex) {
                item.sort = this.state.items.length - newIndex - 1 - 0.5;
            } else if (newIndex < oldIndex) {
                item.sort = this.state.items.length - newIndex - 1 + 0.5;
            }
            app.trigger("save:item-detail", item, true);
        }
    },

    componentDidMount() {
        const {app} = this.props;
        app.trigger("load:items"); 

        this.initSort();
    },

    renderItems() {
        return this.state.items.map(i => {
            i.active = this.state.active === i.id;
            return <Item key={i.id + "" + i.sort} data={i} app={this.props.app} />;
        });
    },

    render() {
        return <div className="items">{this.renderItems()}</div>;
    }
});
