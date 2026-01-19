import { useEffect, useState } from "react";

const Time = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <h2>
            {date.getHours().toString().padStart(2, '0')}:
            {date.getMinutes().toString().padStart(2, '0')}.
            {date.getSeconds().toString().padStart(2, "0")}
        </h2>
    );
};

export default Time;