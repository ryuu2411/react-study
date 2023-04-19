import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DrawerComponent } from "./DrawerComponent";
import { ItemList } from "./ui/item";

type Props = {
    Message: string
};

type FileData = {
    file: Blob;
    fileName: any;
    type: string;
    base64: any;
}

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
    const items = ["足し算", "引き算", "かけ算", "わり算"];
    const [seleceItem, setSelectItem] = useState("足し算");
    const [numOpe, setNumOpe] = useState(1);
    const [numV1, setNumV1] = useState(0);
    const [numV2, setNumV2] = useState(0);
    const [resultNum, setResultNum] = useState(0);

    /* state */
    const [text, setText] = useState("");
    const [array, setArray] = useState<string[]>([]);
    const [drawerState, setDrawerState] = useState(true);
    const [fileData, setFileData] = useState<FileData>();
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

    const getFileData = useCallback((e: any) => {
        const file = e.target.files[0];
        let fileData2: FileData;
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                fileData2 = {
                    file: file,
                    fileName: file.name,
                    type: file.type,
                    base64: event.target?.result,
                }
                setFileData(fileData2);
            };
        } else {
            setFileData(undefined);
        }
    }, [fileData]);

    const onFileDownload = () => {
        const link = document.createElement('a');
        link.download = fileData?.fileName;
        link.href = URL.createObjectURL(fileData?.fileName);
        link.click();
        URL.revokeObjectURL(link.href);
    }

    const handleBtn = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'text/csv';
        input.onchange = (e: any) => {
            const event = e as React.ChangeEvent<HTMLInputElement>;
            const file = event.target.files?.[0];
            if (!file) return;
            console.log('e', e.target.files);
            console.log(file);
            if (file.type !== 'text/csv') {
                alert('csvじゃありません。')
            }
        }
        input.click();
    }, [])

    const handlePullChange = useCallback((e: any) => {
        setSelectItem(e.target.value);
        const ope = items.indexOf(e.target.value, 0);
        setNumOpe(ope + 1);
    }, [seleceItem]);

    const handleV1 = useCallback((e: any) => {
        setNumV1(e.target.value);
    }, [numV1])

    const handleV2 = useCallback((e: any) => {
        setNumV2(e.target.value);
    }, [numV1])

    const handleFetchEvent = useCallback(() => {
        fetch(`https://lol-history-2u5scyjy7-sight2nd.vercel.app/api/calc?ope=${numOpe}&v1=${numV1}&v2=${numV2}`)
            .then(res => res.json())
            .then(data => {
                console.log("aaa", data.result);
                setResultNum(data.result);
            })
    }, [numOpe, numV1, numV2])

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
            <input type="file" onChange={(e) => getFileData(e)} />
            <button onClick={onFileDownload} disabled={!fileData || fileData === undefined}>ダウンロード</button>
            <button onClick={handleBtn}>ボタン</button>
            <Link to="/">一覧へ</Link>
            <section>
                <select value={seleceItem} onChange={handlePullChange}>
                    {items.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </section>
            <input type="number" pattern="^[1-9][0-9]*$" onChange={handleV1} />
            <input type="number" pattern="^[1-9][0-9]*$" onChange={handleV2} />
            <p>演算子：{seleceItem}</p>
            <button onClick={handleFetchEvent}>計算</button>
            <p>結果：{resultNum}</p>
        </div>
    )
}