import React from "react";
import './Aside.css'
import Item from "./Item";
import { useItems } from "../../hooks/useItems";
const Aside: React.FC = () => {

    const {items, handleItemClick} = useItems()
    console.log(items);
    return (
        <aside>
            {items && items.map((item, key) => (
                <Item key={key} selected={item.selected} date={item.date} itemTitle={item.itemTitle} itemDescription={item.itemDescription} handleItemClick={() => handleItemClick(key)}/>
            ))}
        </aside>
    )
}

export default Aside