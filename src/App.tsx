import React from 'react';

function App() {
  return (
    <div className="container">
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

      <aside>
        <div className="todo-item">
          <h5 className="todo-item-title"></h5>
          <p className="todo-item-description">
            <span className="todo-item-date"></span>
            <span className="todo-item-text"></span>
          </p>
        </div>
      </aside>
    </div>
  );
}

export default App;
