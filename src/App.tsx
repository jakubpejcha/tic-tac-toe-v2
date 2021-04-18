import React, { useState } from 'react';
import './App.css';
import Board from './Board';

const App = () => {

  const [themeGrey, setThemeGrey] = useState(false);

  const theme = themeGrey ? 'grey' : 'color';

  return (
      <div className={`app-container app-container--${theme}`}>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setThemeGrey(prev => !prev)}
        >Přepnout vzhled</button>
        <Board />
      </div>
  );
};

export default App;
