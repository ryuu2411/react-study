import React from "react";
import { Routes, Route } from "react-router-dom";
import { SampleHome } from "./components/SampleHome";
import { SamplePage4 } from "./components/SamplePage4";
import { NotFound } from "./components/NotFound";

export const RouterConfig = () => {
    return (
        <>
            <Routes>
                <Route index element={<SampleHome />} />
                <Route path="page4" element={<SamplePage4 Message="Hi Router" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}