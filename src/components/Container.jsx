import {useEffect, useState} from "react";


const Container = () => {
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
            setError("Пожалуйста, введите числа");
            setResult(null);
            return;
        }

        const arr = value
            .split(/,\s*|\s+|-\s*\[\s*\]\s*/)
            .map(v => v.trim())
            .filter(v => v !== "");

        if (arr.length === 0) {
            setError("Не найдено чисел для вычисления");
            setResult(null);
            return;
        }

        // Check if all values are valid numbers
        const invalidNumbers = arr.filter(v => isNaN(v) || v === "");
        if (invalidNumbers.length > 0) {
            setError("Обнаружены недопустимые значения");
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
                <h2>Как использовать:</h2>
                <div className="examples">
                    <div className="example-item">
                        <span className="example-label">Через запятую:</span>
                        <span className="example-value">1,2,3,4,5</span>
                    </div>
                    <div className="example-item">
                        <span className="example-label">Через пробел:</span>
                        <span className="example-value">1 2 3 4 5</span>
                    </div>
                    <div className="example-item">
                        <span className="example-label">Apple Notes:</span>
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
                        placeholder="Введите числа: 1,2,3 или 1 2 3"
                        autoComplete="off"
                        autoFocus
                    />
                    {value && (
                        <button 
                            type="button" 
                            className="clear-button"
                            onClick={handleClear}
                            aria-label="Очистить"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        <span className="button-icon">➕</span>
                        <span>Вычислить сумму</span>
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
                <div className="result-label">Результат:</div>
                <div className="result-value">
                    {result !== null ? result : "Введите числа и нажмите кнопку"}
                </div>
            </div>
        </div>
    )
}

export default Container