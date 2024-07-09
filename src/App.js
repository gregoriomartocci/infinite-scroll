import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageList from './components/ImageList/ImageList.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import ImageDetail from './components/ImageDetail/ImageDetail.tsx';

const App = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const loader = useRef(null);
  
  console.log("🚀 ~ App ~ images:", images)
  
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
        setImages(prevImages => [...prevImages, ...response.data]);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchImages();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 1.0 });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    setFilteredImages(
      images.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, images]);

  return (
    <Router>
      <div className="App">
        <h1>Infinite Scroll Image Gallery</h1>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredImages={filteredImages} loading={loading} error={error} setSelectedImage={setSelectedImage} loader={loader} />} />
          <Route path="/image/:id" element={<ImageDetail image={selectedImage} setSelectedImage={setSelectedImage} />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = ({ searchQuery, setSearchQuery, filteredImages, loading, error, setSelectedImage, loader }) => (
  <>
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <ImageList images={filteredImages} loading={loading} error={error} setSelectedImage={setSelectedImage} />
    <div ref={loader} />
  </>
);

export default App;
