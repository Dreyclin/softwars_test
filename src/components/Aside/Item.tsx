import React from "react";
import { ItemType } from "../../models/ItemType";

const Item: React.FC<ItemType> = ({itemTitle, itemDescription}) => {
    return (
        <div className="todo-item">
            <h5 className="todo-item-title main-text">{itemDescription}</h5>
            <p className="todo-item-description secondary-text">
                <span className="todo-item-date">12:47</span>
                <span className="todo-item-text">{itemTitle}</span>
            </p>
        </div>
    )
}

export default Item