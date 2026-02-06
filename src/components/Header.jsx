import Time from "./Time.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="header-title-section">
                <h1>Сумма чисел</h1>
                <p className="header-subtitle">Быстрое вычисление суммы</p>
            </div>
            <div className="header-controls">
                <div className="time-wrapper">
                    <div className="time-label">Время</div>
                    <div className="time">
                        <Time/>
                    </div>
                </div>
                <button 
                    className="theme-toggle" 
                    onClick={toggleTheme} 
                    aria-label="Переключить тему"
                    title={theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'}
                >
                    <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
                </button>
            </div>
        </>
    )
}

export default Header