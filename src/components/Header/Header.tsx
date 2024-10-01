import React from "react";

const Header: React.FC = () => {
    return (
        <header>
            <div className="logo">
                <div className="logo-img"></div>
                <div className="logo-text"></div>
            </div>
            <div className="control-btns">
                <button className="btn create-new-btn"></button>
                <button className="btn delete-btn"></button>
            </div>
            <div className="filter-input">
                <input type="text" placeholder='Пошук' />
            </div>
        </header>
    )
}

export default Header