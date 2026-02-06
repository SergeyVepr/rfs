import { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(null);

const translations = {
    en: {
        header: {
            title: "Sum of numbers",
            subtitle: "Fast sum calculation",
            time: "Time",
            language: "Language",
            themeAria: "Toggle theme",
            themeToDark: "Switch to dark theme",
            themeToLight: "Switch to light theme",
        },
        container: {
            howToUse: "How to use:",
            byComma: "Comma-separated:",
            bySpace: "Space-separated:",
            appleNotes: "Apple Notes:",
            placeholder: "Enter numbers: 1,2,3 or 1 2 3",
            clear: "Clear",
            calcSum: "Calculate sum",
            errorEnterNumbers: "Please enter numbers",
            errorNoNumbers: "No numbers found to calculate",
            errorInvalidValues: "Invalid values detected",
            result: "Result:",
            resultEmpty: "Enter numbers and press the button",
        },
        footer: {
            madeBy: "Made by Serg_Vepr",
        },
    },
    ru: {
        header: {
            title: "Сумма чисел",
            subtitle: "Быстрое вычисление суммы",
            time: "Время",
            language: "Язык",
            themeAria: "Переключить тему",
            themeToDark: "Переключить на тёмную тему",
            themeToLight: "Переключить на светлую тему",
        },
        container: {
            howToUse: "Как использовать:",
            byComma: "Через запятую:",
            bySpace: "Через пробел:",
            appleNotes: "Apple Notes:",
            placeholder: "Введите числа: 1,2,3 или 1 2 3",
            clear: "Очистить",
            calcSum: "Вычислить сумму",
            errorEnterNumbers: "Пожалуйста, введите числа",
            errorNoNumbers: "Не найдено чисел для вычисления",
            errorInvalidValues: "Обнаружены недопустимые значения",
            result: "Результат:",
            resultEmpty: "Введите числа и нажмите кнопку",
        },
        footer: {
            madeBy: "Made by Serg_Vepr",
        },
    },
    uk: {
        header: {
            title: "Сума чисел",
            subtitle: "Швидке обчислення суми",
            time: "Час",
            language: "Мова",
            themeAria: "Перемкнути тему",
            themeToDark: "Перемкнути на темну тему",
            themeToLight: "Перемкнути на світлу тему",
        },
        container: {
            howToUse: "Як користуватися:",
            byComma: "Через кому:",
            bySpace: "Через пробіл:",
            appleNotes: "Apple Notes:",
            placeholder: "Введіть числа: 1,2,3 або 1 2 3",
            clear: "Очистити",
            calcSum: "Обчислити суму",
            errorEnterNumbers: "Будь ласка, введіть числа",
            errorNoNumbers: "Не знайдено чисел для обчислення",
            errorInvalidValues: "Виявлено некоректні значення",
            result: "Результат:",
            resultEmpty: "Введіть числа та натисніть кнопку",
        },
        footer: {
            madeBy: "Made by Serg_Vepr",
        },
    },
    he: {
        header: {
            title: "סכום מספרים",
            subtitle: "חישוב סכום מהיר",
            time: "שעה",
            language: "שפה",
            themeAria: "החלפת ערכת נושא",
            themeToDark: "מעבר לערכת נושא כהה",
            themeToLight: "מעבר לערכת נושא בהירה",
        },
        container: {
            howToUse: "איך משתמשים:",
            byComma: "מופרד בפסיקים:",
            bySpace: "מופרד ברווחים:",
            appleNotes: "Apple Notes:",
            placeholder: "הכנס מספרים: 1,2,3 או 1 2 3",
            clear: "נקה",
            calcSum: "חשב סכום",
            errorEnterNumbers: "נא להזין מספרים",
            errorNoNumbers: "לא נמצאו מספרים לחישוב",
            errorInvalidValues: "נמצאו ערכים לא תקינים",
            result: "תוצאה:",
            resultEmpty: "הכנס מספרים ולחץ על הכפתור",
        },
        footer: {
            madeBy: "נוצר על ידי Serg_Vepr",
        },
    },
};

function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj);
}

export const useI18n = () => {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
    return ctx;
};

export const I18nProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem("language") || "ru");

    useEffect(() => {
        localStorage.setItem("language", language);

        const dir = language === "he" ? "rtl" : "ltr";
        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", language);
    }, [language]);

    const t = useMemo(() => {
        return (key) => {
            const current = getByPath(translations[language], key);
            if (current != null) return current;

            const fallback = getByPath(translations.en, key);
            if (fallback != null) return fallback;

            return key;
        };
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};