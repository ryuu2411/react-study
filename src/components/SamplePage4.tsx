import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DrawerComponent } from "./DrawerComponent";
import { ItemList } from "./ui/item";

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
    /* hooks */
    const param = useSearchParams();

    /* state */
    const [text, setText] = useState("");
    const [array, setArray] = useState<string[]>([]);
    const [drawerState, setDrawerState] = useState(true);
    /* callback */
    const handleChange = useCallback((e: { target: { value: string; }; }) => {
        if (e.target.value.length > 5) {
            alert("5文字以内にしてください。")
            return;
        }
        setText(e.target.value.trim());
    }, [])
    const handleAdd = useCallback(() => {
        if (text === "") return;
        setArray((prevArray) => {
            if (prevArray.some((item) => item === text)) {
                alert("同じ要素が存在します。");
                return prevArray;
            }
            return [...prevArray, text];
        });
    }, [text]);

    const deleteText = useCallback((index: number) => {
        const deleteData = array[index];
        if (!deleteData) return;
        array.splice(index, 1);
        setArray([...array]);
    }, [array]);
    const handleOpenDrawer = (oepn: true) => {
        setDrawerState(oepn);
    };
    const handleChangeColorDrawer = (close: false, str: string) => {
        document.body.style.backgroundColor = str;
        setDrawerState(close);
    };
    /* life-cycle */
    useEffect(() => {
        document.body.style.backgroundColor = "lightblue"
        return () => {
            document.body.style.backgroundColor = ""
        }
    }, []);

    useEffect(() => {
        console.log('文字かわった: ', text);
    }, [text]);

    return (
        <div style={{ display: 'flex', padding: '1rem', alignItems: 'center', gap: '4px', flexDirection: 'column' }}>
            <Button variant="contained" onClick={() => handleOpenDrawer(true)}>
                オープン
            </Button>
            <DrawerComponent
                drawerState={drawerState}
                handleChangeColorDrawer={handleChangeColorDrawer}
            />
            <div>
                <h2>カウント：{array.length}</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
                <input type="text" value={text} onChange={handleChange} />
                <button onClick={handleAdd}>追加</button>
            </div>
            <ItemList array={array} onDelete={(i) => deleteText(i)} />
            <Link to="/">一覧へ</Link>
        </div>
    )
}