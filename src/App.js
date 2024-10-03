import React from 'react';
import { useTheme } from './ThemeContext';
import SortingVisualizer from './components/SortingVisualizer'; // Adjust according to your file structure
import './App.css'; // Make sure to include your styles

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={isDarkMode ? 'app dark' : 'app light'}>
      <header>
        <h1>Sorting Algorithm Visualizer</h1>
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <SortingVisualizer />
    </div>
  );
};

export default App;
