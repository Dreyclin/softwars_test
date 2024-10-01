import React from "react";

const Main: React.FC = () => {
    return (
        <main>
            <p className="date"></p>
            <div className="add-todo-container">
                <input type="text" placeholder="Заголовок" />
                <textarea name="" id="" placeholder='Текст'></textarea>
            </div>
        </main>
    )
}

export default Main