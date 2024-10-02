import React from "react";
import { ItemType } from "../../models/ItemType";

const Item: React.FC<ItemType> = ({itemTitle, itemDescription, date}) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const formatDate = (date: Date) => {
        if(isToday) {
            return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        } else {
            return date.toLocaleDateString();
        }
    }

    return (
        <div className="todo-item">
            <h5 className="todo-item-title main-text">{itemDescription}</h5>
            <p className="todo-item-description secondary-text">
                <span className="todo-item-date">{formatDate(date)}</span>
                <span className="todo-item-text">{itemTitle}</span>
            </p>
        </div>
    )
}

export default Item