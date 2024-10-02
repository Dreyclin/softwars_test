import React from "react";
import { ItemType } from "../../models/ItemType";
import useToDo from "../../hooks/useToDo";

const Item: React.FC<ItemType> = ({itemTitle, itemDescription, date, selected, handleItemClick}) => {
    
    const {formatDate} = useToDo()

    return (
        <div className={`todo-item ${selected && 'active-item'}`} onClick={handleItemClick}>
            <h5 className="todo-item-title main-text">{itemTitle === "" && "Нова нотатка"}</h5>
            <p className="todo-item-description secondary-text">
                <span className="todo-item-date">{formatDate(date)}</span>
                <span className="todo-item-text">{itemDescription === "" && "Ще немає тексту"}</span>
            </p>
        </div>
    )
}

export default Item