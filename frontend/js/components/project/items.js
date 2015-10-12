import React from "react";
import Item from "./item";
import ItemActions from "./itemActions";


export default React.createClass({
    initSort() {
        Sortable.create(this.getDOMNode(), {onSort: this.onSort});
    },

    onSortStart(evt) {
        const {oldIndex} = evt;
        const {app} = this.props;
        const item = app.model.items.filter(i => i.sort === oldIndex)[0];
        if (item) {
            app.trigger("select:item", item.id);
        }
    },

    onSort(evt) {
        const {newIndex, oldIndex} = evt;
        const {app} = this.props;
        const item = app.model.items.filter(i => i.sort === (app.model.items.length - oldIndex - 1))[0];
        if (item) {
            if (newIndex > oldIndex) {
                item.sort = this.props.app.model.items.length - newIndex - 1 - 0.5;
            } else if (newIndex < oldIndex) {
                item.sort = this.props.app.model.items.length - newIndex - 1 + 0.5;
            }
            app.trigger("save:item-detail", item, true);
        }
    },

    componentDidMount() {
        this.initSort();
    },

    renderItems() {
        const {items, activeItem} = this.props.app.model;
        return items.map(i => {
            i.active = activeItem ? (activeItem.id === i.id) : false;
            return <Item key={i.id + "" + i.sort} data={i} app={this.props.app} />;
        });
    },

    render() {
        return <div className="items">
            <ItemActions app={this.props.app} />
            {this.renderItems()}
        </div>;
    }
});
