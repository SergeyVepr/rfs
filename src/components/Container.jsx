import {useEffect, useState} from "react";
import { useI18n } from "../contexts/I18nContext.jsx";

const Container = () => {
    const { t } = useI18n();

    const [value, setValue] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // Clear error when value changes
        if (error) setError("");
    }, [value])

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!value.trim()) {
            setError(t("container.errorEnterNumbers"));
            setResult(null);
            return;
        }

        const arr = value
            .split(/,\s*|\s+|-\s*\[\s*\]\s*/)
            .map(v => v.trim())
            .filter(v => v !== "");

        if (arr.length === 0) {
            setError(t("container.errorNoNumbers"));
            setResult(null);
            return;
        }

        // Check if all values are valid numbers
        const invalidNumbers = arr.filter(v => isNaN(v) || v === "");
        if (invalidNumbers.length > 0) {
            setError(t("container.errorInvalidValues"));
            setResult(null);
            return;
        }

        const sum = arr.reduce((a, b) => +a + +b, 0);
        setResult(sum);
    };

    const handleClear = () => {
        setValue("");
        setResult(null);
        setError("");
    };

    return (
        <div className="container-content">
            <div className="instructions">
                <h2>{t("container.howToUse")}</h2>
                <div className="examples">
                    <div className="example-item">
                        <span className="example-label">{t("container.byComma")}</span>
                        <span className="example-value">1,2,3,4,5</span>
                    </div>
                    <div className="example-item">
                        <span className="example-label">{t("container.bySpace")}</span>
                        <span className="example-value">1 2 3 4 5</span>
                    </div>
                    <div className="example-item">
                        <span className="example-label">{t("container.appleNotes")}</span>
                        <span className="example-value">- [] 1 - [] 2 - [] 3</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <div className="input-wrapper">
                    <input
                        className="addString"
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={t("container.placeholder")}
                        autoComplete="off"
                        autoFocus
                    />
                    {value && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                            aria-label={t("container.clear")}
                            title={t("container.clear")}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-button">
                        <span className="button-icon">➕</span>
                        <span>{t("container.calcSum")}</span>
                    </button>
                </div>
            </form>

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            <div className={`result ${result !== null ? 'result-show' : ''}`}>
                <div className="result-label">{t("container.result")}</div>
                <div className="result-value">
                    {result !== null ? result : t("container.resultEmpty")}
                </div>
            </div>
        </div>
    )
}

export default Container