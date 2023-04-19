import { Button } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    /**
     * items selectItemの設定の仕方が不具合を生みやすいので変更
     */
    // const items = ["足し算", "引き算", "かけ算", "わり算"];
    // const [seleceItem, setSelectItem] = useState("足し算");
    // ↓
    const operationsList = [
        { value: 1, label: '足し算', operation: '+' },
        { value: 2, label: '引き算', operation: '-' },
        { value: 3, label: '掛け算', operation: '×' },
        { value: 4, label: '割り算', operation: '÷' },
    ];
    const [selectOperation, setSelectOperation] = useState(1);
    const displayOperationData = useMemo(() => {
        return operationsList.find((v) => v.value === selectOperation);
    }, [selectOperation]);
    
    /* ↑により不要のため削除 */
    // const [numOpe, setNumOpe] = useState(1);
    const [numV1, setNumV1] = useState(0);
    const [numV2, setNumV2] = useState(0);
    const [resultNum, setResultNum] = useState(1);

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

    // const handlePullChange = useCallback((e: any) => {
    /* anyを使わない */
    const handlePullChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        // setSelectItem(e.target.value);
        /* selectOperationはnumber型なのでキャストする */
        const changeValue = Number(e.target.value);
        if (!changeValue) {
            window.alert('選択された値が正しくありません。');
            return
        };
        setSelectOperation(changeValue);
        // const ope = items.indexOf(e.target.value, 0);
        // setNumOpe(ope + 1);
    }, []);

    /**
     * numV1はnumberで定義されているのに、
     * eがanyのためe.target.value: stringが代入されてしまっている。
     */
    // const handleV1 = useCallback((e: any) => {
    const handleV1 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // setNumV1(e.target.value);
        const changeValue = Number(e.target.value);
        if (isNaN(changeValue)) return;
        setNumV1(changeValue);
    }, [numV1])

    const handleV2 = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // setNumV2(e.target.value);
        const changeValue = Number(e.target.value);
        if (isNaN(changeValue)) return;
        setNumV2(changeValue);

    }, [numV1])

    const handleFetchEvent = useCallback(() => {
        /* このままだと毎回↓を書くことになるので、何かしら間に挟むモジュールを作成したい。 */
        fetch(`https://lol-history-2u5scyjy7-sight2nd.vercel.app/api/calc?ope=${selectOperation}&v1=${numV1}&v2=${numV2}`)
            .then(res => res.json())
            .then(data => {
                console.log("aaa", data.result);
                setResultNum(data.result);
            })
    }, [selectOperation, numV1, numV2])

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
                <select value={selectOperation} onChange={handlePullChange}>
                    {operationsList.map((operation) => (
                        <option key={`operation_select_${operation.value}`} value={operation.value}>
                            {operation.label}
                        </option>
                    ))}
                </select>
            </section>
            {/* inputには基本的にvalueを当てる */}
            <input type="number" value={`${numV1}`} pattern="^[1-9][0-9]*$" onChange={handleV1} style={{ textAlign: 'right' }} />
            <input type="number" value={`${numV2}`} pattern="^[1-9][0-9]*$" onChange={handleV2} style={{ textAlign: 'right' }} />
            {/* ↓こういう時にMemoを使用 */}
            {/* <p>演算子：{seleceItem}</p> */}
            {/* <p>演算子：{displayOperationLabel?.label ?? '---'}</p> */}
            {/* 表示がダサいのでそれっぽく変更 */}
            <div style={{ display:'flex', gap: '0.25rem', justifyContent: 'space-around', width: '100%' }}>
                <div style={{width: '50%', textAlign: 'right'}}>{numV1 < 0 ? `(${numV1.toLocaleString()})` : numV1.toLocaleString()}</div>
                <div style={{ lineHeight: '16px' }}>{displayOperationData?.operation ?? '+'}</div>
                <div style={{width: '50%'}}>{numV2 < 0 ? `(${numV2.toLocaleString()})` : numV2.toLocaleString()}</div>
            </div>
            <button onClick={handleFetchEvent}>計算</button>
            <p>結果：{resultNum}</p>
        </div>
    )
}