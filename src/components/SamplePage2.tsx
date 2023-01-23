import React from "react";
import { useSearchParams } from "react-router-dom";
export const SamplePage2: React.VFC = () => {

    const [searchParams] = useSearchParams();

    const query1 = searchParams.get("query1");
    const query2 = searchParams.get("query2");

    return (
        <>
            <p>query1={query1}</p>
            <p>query2={query2}</p>
        </>
    );
}