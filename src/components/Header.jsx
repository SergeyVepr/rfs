import Time from "./Time.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useI18n } from "../contexts/I18nContext.jsx";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useI18n();

    return (
        <>
            <div className="header-title-section">
                <h1>{t("header.title")}</h1>
                <p className="header-subtitle">{t("header.subtitle")}</p>
            </div>
            <div className="header-controls">
                <div className="time-wrapper">
                    <div className="time-label">{t("header.time")}</div>
                    <div className="time">
                        <Time/>
                    </div>
                </div>

                <div className="lang-switch" title={t("header.language")}>
                    <span className="lang-label">{t("header.language")}</span>
                    <div className="lang-select-wrap">
                        <select
                            className="lang-select"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            aria-label={t("header.language")}
                        >
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                            <option value="uk">UK</option>
                            <option value="he">HE</option>
                        </select>
                        <span className="lang-caret" aria-hidden="true">▾</span>
                    </div>
                </div>

                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={t("header.themeAria")}
                    title={theme === 'light' ? t("header.themeToDark") : t("header.themeToLight")}
                >
                    <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
                </button>
            </div>
        </>
    )
}

export default Header