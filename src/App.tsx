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

      </aside>
    </div>
  );
}

export default App;
