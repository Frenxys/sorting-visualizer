import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, useTheme } from './ThemeContext'; // Import ThemeProvider

const ThemeWrapper = () => {
    const { isDarkMode } = useTheme();

    // Apply the dark theme class based on the context state
    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkMode]);

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <ThemeWrapper />
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
