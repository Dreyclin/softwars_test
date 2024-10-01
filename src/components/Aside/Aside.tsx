import React from "react";
import './Aside.css'
import Item from "./Item";
const Aside: React.FC = () => {
    return (
        <aside>
            <Item />
            <Item />
            <Item />
        </aside>
    )
}

export default Aside