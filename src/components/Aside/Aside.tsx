import React from "react";
import './Aside.css'
import Item from "./Item";
import useToDo from "../../hooks/useToDo";
const Aside: React.FC = () => {

    const {newItems, handleItemClick} = useToDo()

    return (
        <aside>
            {newItems && newItems.map((item, key) => (
                <Item key={key} selected={item.selected} date={item.date} itemTitle={item.itemTitle} itemDescription={item.itemDescription} handleItemClick={() => handleItemClick(key)}/>
            ))}
        </aside>
    )
}

export default Aside