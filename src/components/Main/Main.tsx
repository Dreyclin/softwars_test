import React, { useEffect, useState } from "react";
import "./Main.css"
import useToDo from "../../hooks/useToDo";

const Main: React.FC = () => {

    const {todayFormated} = useToDo()
    
    return (
        <main>
            <p className="date">{todayFormated}</p>
            <div className="add-todo-container">
                <input type="text" placeholder="Заголовок" className="title-field field"/>
                <textarea name="" id="" placeholder='Текст' className="description-field field"></textarea>
            </div>
        </main>
    )
}

export default Main