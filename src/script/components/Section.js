import { data } from "jquery";

export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer,
        this._container = document.querySelector(containerSelector);
        
    }
    
    renderItems() {
        this._renderedItems.forEach(data =>  this._renderer(data));
    };

    addItem(element){
        this._container.prepend(element);
    }
}

// const list1 = new Section({}, '.list');
// const list2 = new Section({}, '.list2');


// list1.addItem({})
// list2.addItem({.})