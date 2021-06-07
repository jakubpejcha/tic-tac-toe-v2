import React, { useState } from 'react';
import './styles/App.css';
import Board from './Board';
import ThemeToggler from './ThemeToggler';

const App = () => {

  const [themeGrey, setThemeGrey] = useState(false);

  const theme = themeGrey ? 'grey' : 'color';

  const handleThemeChange = () => {
    setThemeGrey(prev => !prev)
  }

  return (
      <div className={`app-container app-container--${theme}`}>
        <ThemeToggler
          theme={theme}
          onClickHandler={handleThemeChange}
        />
        <Board />
      </div>
  );
};

export default App;
