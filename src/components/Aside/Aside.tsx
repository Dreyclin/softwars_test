import React from "react";
import './Aside.css'

const Aside: React.FC = () => {
    return (
        <aside>
                <div className="todo-item active-item">
                    <h5 className="todo-item-title main-text">Нова нотатка</h5>
                    <p className="todo-item-description secondary-text">
                        <span className="todo-item-date">12:47</span>
                        <span className="todo-item-text">Ще немає тексту</span>
                    </p>
                </div>
                <div className="todo-item">
                    <h5 className="todo-item-title main-text">Нова нотатка</h5>
                    <p className="todo-item-description secondary-text">
                        <span className="todo-item-date">12:47</span>
                        <span className="todo-item-text">Ще немає тексту</span>
                    </p>
                </div>
                <div className="todo-item">
                    <h5 className="todo-item-title main-text">Нова нотатка</h5>
                    <p className="todo-item-description secondary-text">
                        <span className="todo-item-date">12:47</span>
                        <span className="todo-item-text">Ще немає тексту</span>
                    </p>
                </div>
        </aside>
    )
}

export default Aside