// src/App.js
import React, {  useRef} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageList from "./components/ImageList/ImageList.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import ImageDetail from "./components/ImageDetail/ImageDetail.tsx";
import { ImageProvider } from "./context/ImageContext.tsx";

const App = () => {
  return (
    <Router>
      <ImageProvider>
        <div className="App">
          <h1>Infinite Scroll Image Gallery</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image/:id" element={<ImageDetail />} />
          </Routes>
        </div>
      </ImageProvider>
    </Router>
  );
};

const Home = () => {
  const loader = useRef(null);

  return (
    <>
      <SearchBar />
      <ImageList />
      <div ref={loader} />
    </>
  );
};

export default App;
