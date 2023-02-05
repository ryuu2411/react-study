import React from "react";
import { Link } from "react-router-dom";
import { createSearchParams } from "react-router-dom";

export const SampleHome: React.VFC = () => {
    const params: string = createSearchParams({
        query1: "value3",
        query2: "value4"
    }).toString();
    return (
        <>
            <h1>Sample Home</h1>
            <nav>
                <ul>
                    <li><Link to="page2">Sample Page2</Link></li>
                    <li><Link to="page2?query1=value1&query2=value2">Sample Page2 With Query1</Link></li>
                    <li><Link to={`page2?${params}`}>Sample Page2 With Query2</Link></li>
                    <li><Link to="page3_hello">Sample Page3 Hello</Link></li>
                    <li><Link to="page3_hi">Sample Page3 Hi</Link></li>
                    <li><Link to="page4">Sample Page4</Link></li>
                </ul>
            </nav>
        </>
    );
}