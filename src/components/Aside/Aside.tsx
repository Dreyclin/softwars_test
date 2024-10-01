import React from "react";

const Aside: React.FC = () => {
    return (
        <aside>
            <div className="todo-item">
                <h5 className="todo-item-title">Нова нотатка</h5>
                <p className="todo-item-description">
                    <span className="todo-item-date"></span>
                    <span className="todo-item-text"></span>
                </p>
            </div>
        </aside>
    )
}

export default Aside