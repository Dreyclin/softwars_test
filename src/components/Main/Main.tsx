import React from "react";
import "./Main.css"
import { useItems } from "../../hooks/useItems";

const Main: React.FC = () => {

    const {items, todayFormated, itemDetails, handleItemChange} = useItems()

    return (
        <main>
            <p className="date">{todayFormated}</p>
            {items.length > 0 ? ( <div className="add-todo-container">
                <input name="title" type="text" placeholder="Заголовок" className="title-field field"  value={itemDetails.title === "Нова нотатка" ? "" : itemDetails.title} onChange={handleItemChange}/>
                <textarea name="description" id="" placeholder='Текст' className="description-field field" value={itemDetails.description === "Ще немає тексту" ? "" : itemDetails.description} onChange={handleItemChange}></textarea>
            </div>) : "Немає справ"}
        </main>
    )
}

export default Main