import React, { useEffect, useState } from "react";
import './Aside.css'
import Item from "./Item";
import { ItemType } from "../../models/ItemType";
import { items } from "../items";
const Aside: React.FC = () => {

    const [newItems, setNewItems] = useState<ItemType[]>([])

    useEffect(() => {
        setNewItems(items)
    }, [newItems])
    return (
        <aside>
            {newItems && newItems.map(item => (
                <Item date={item.date} itemTitle={item.itemTitle} itemDescription={item.itemDescription}/>
            ))}
            {/* <Item />
            
            <Item />
            <Item /> */}
        </aside>
    )
}

export default Aside