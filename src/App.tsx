import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Rec from "./pages/Rec/Rec";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rec/:roomId" element={<Rec />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
