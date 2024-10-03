import React, { useEffect, useState } from "react";
import "./Main.css"
import { useItems } from "../../hooks/useItems";

const Main: React.FC = () => {

    const {todayFormated, title, description, handleTitleChange, handleDescriptionChange} = useItems()

    return (
        <main>
            <p className="date">{todayFormated}</p>
            <div className="add-todo-container">
                <input type="text" placeholder="Заголовок" className="title-field field" value={title} onChange={handleTitleChange}/>
                <textarea name="" id="" placeholder='Текст' className="description-field field" value={description} onChange={handleDescriptionChange}></textarea>
            </div>
        </main>
    )
}

export default Main