import React, { useEffect, useState } from "react";
import "./Main.css"

const Main: React.FC = () => {
    
    const today = new Date();
    const [todayFormated, setTodayFormated] = useState<string>();

    useEffect(() => {
        setTodayFormated(today.toLocaleDateString("uk-UA", {day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: '2-digit'}).replace(/\s*р\./, '').replace(/\s*о\s*(?=\d{2}:\d{2})/, ' '))
    }, [])

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