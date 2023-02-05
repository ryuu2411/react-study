import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DrawerComponent } from "./DrawerComponent";
import { ItemList } from "./ui/item";

type Props = {
    Message: string
};

type FileData = {
    file: any;
    fileName: any;
    type: any;
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

    const getFileData = (e: any) => {
        const file = e.target.files[0];
        let fileData: FileData;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            fileData = {
                file: file,
                fileName: file.name,
                type: file.type,
                base64: event.target?.result,
            }
            setFileData(fileData);
        };
    }

    const onFileDownload = () => {
        let bin = fileData?.base64.replace(/^.*,/, '');
        let buffer = new Uint8Array(bin.length);
        for(let i = 0; i < bin.length; i++){
            buffer[i] = bin.charCodeAt(i);
        }
        const blob = new Blob([buffer.buffer], { type: fileData?.type});
        const link = document.createElement('a');
        link.download = fileData?.fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }
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
            <input type="file" onChange={getFileData} />
            <button onClick={onFileDownload}>ダウンロード</button>
            <Link to="/">一覧へ</Link>
        </div>
    )
}