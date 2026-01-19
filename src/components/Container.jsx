import {useEffect, useState} from "react";


const Container = () => {
    const [value, setValue] = useState("");
    const [result, setResult] = useState(0);
    useEffect(() => {

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const arr = value
            .split(/,\s*|\s|-\s*\[\s*\]\s*/)
            .map(v => v.trim())
            .filter(v => v !== "");

        if (arr.length === 0) {
            return "Enter string"
        }
        console.log(arr);
        setResult(arr.reduce((a, b) => +a + +b, 0));
    };

    return (
        <div>
            <p>
                Enter string with numbers: 1,2,3,4,5 or - [] 1 - [] 2 - [] 3 - [] 3 == symbol of separation ( - [] =
                note from apple or , or space)
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    className="addString"
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="enter string => 1,2,3,4,5 or [] 1 - [] 2 - [] 3 - [] 3 or 1 2 3 4 5"
                />
                <button type="submit">Send</button>
            </form>
            <p>
                {result ? result : "- [ ] or , or space"}
            </p>
        </div>

    )
}

export default Container