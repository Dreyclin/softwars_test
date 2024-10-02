import React from "react";
import './Header.css'
import useToDo from "../../hooks/useToDo";

const Header: React.FC = () => {

    const {handleAddItem} = useToDo()

    return (
        <header>
            <div className="container">
                <div className="logo-container">
                    <div className="logo-img">
                        <img src="../images/logo.svg" alt="" />
                    </div>
                    <div className="logo-text main-text">
                        LOGO NOTE
                    </div>
                </div>
                <div className="btns-filter-container">
                    <div className="control-btns-container">
                        <button className="btn create-new-btn main-text" onClick={handleAddItem}>
                            <span className="big-plus">+</span>
                            <span>Створити нову</span>
                        </button>
                        <button className="btn delete-btn main-text inactive-btn">
                            <img src="../images/delete_logo.png" alt="" />
                            <span>Видалити</span>
                        </button>
                    </div>
                    <div className="filter-input-container">
                        <input type="text" placeholder='Пошук' />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header