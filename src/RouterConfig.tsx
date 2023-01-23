import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SampleHome } from "./components/SampleHome";
import { SamplePage1 } from "./components/SamplePage1";
import { SamplePage2 } from "./components/SamplePage2";
import { SamplePage3 } from "./components/SamplePage3";
import { SamplePage4 } from "./components/SamplePage4";
import { NotFound } from "./components/NotFound";

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <Routes>
                <Route index element={<SampleHome />} />
                <Route path="page1" element={<SamplePage1 />} />
                <Route path="page2" element={<SamplePage2 />} />
                <Route path="page3_hello" element={<SamplePage3 Message="Hello Router!!!!" />} />
                <Route path="page3_hi" element={<SamplePage3 Message="Hi Router" />} />
                <Route path="page4" element={<SamplePage4 Message="Hi Router" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}