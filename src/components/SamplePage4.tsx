import React, { useCallback, useEffect, useState } from "react";

type Props = {
    Message: string
};

// const LIST = [
//     { label: '1', value: 1 },
//     { label: '2', value: 2 },
//     { label: '3', value: 3 },
//     { label: '4', value: 4 },
// ]

export const SamplePage4: React.VFC<Props> = (props) => {
    // const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const [array, setArray] = useState<string[]>([]);
    // const onClick = () => {
    //     if (!text) return;
    //     window.alert(`あなたの入力した文字は[${text}]です`);
    // // }
    // useEffect(() => {
    //     window.alert(count);
    // }, [])
    useEffect(() => {
        document.body.style.backgroundColor = "lightblue"
        return () => {
            document.body.style.backgroundColor = ""
        }
    }, [])
    const plus = useCallback(() => {
        setCount(count => count + 1)
    }, [])
    const reset = useCallback(() => {
        setCount(count => count - count)
    }, []);
    const handleChange = useCallback((e: { target: { value: string; }; }) => {
        if(e.target.value.length > 5){
            alert("5文字以内にしてください。")
            return;
        }
        setText(e.target.value.trim());
    }, [])
    const handleAdd = useCallback(() => {
        setArray((prevArray) => {
            if(prevArray.some((item) => item === text)){
                alert("同じ要素が存在します。");
                return prevArray;
            }
            return [...prevArray, text];
        });
    }, [text])
    return (
        // <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
        //     {/* <input value={text} onChange={(e) => setText(e.target.value)} />

        //     <button
        //       disabled={!text}
        //       onClick={() => onClick()}
        //     >push!!</button> */}
        //     <select style={{ width: '3rem' }}>
        //       { LIST.map((data) =>  
        //           <option key={data.value}>{data.label}</option>
        //       )}
        //     </select>
        // </div>
        <div style={{ padding: '1rem', justifyContent: 'center', gap: '4px' }}>
            <button onClick={() => plus()}>plus</button>
            <button onClick={() => reset()}>reset</button>
            <h2>カウント：{count}</h2>
            <input type="text" value={text} onChange={handleChange}/>
            <button onClick={handleAdd}>追加</button>
            <ul>
                {array.map((item) => {
                    return <li key={item}>{item}</li>;
                })}
            </ul>
        </div>
    )
}