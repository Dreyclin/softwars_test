import React from "react";
import "./Main.css"

const Main: React.FC = () => {
    return (
        <main>
            <p className="date">18 травня 2024 12:34</p>
            <div className="add-todo-container">
                <input type="text" placeholder="Заголовок" className="title-field field"/>
                <textarea name="" id="" placeholder='Текст' className="description-field field"></textarea>
            </div>
        </main>
    )
}

export default Main