import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ImageList from './components/ImageList/ImageList.tsx';
import SearchBar from './components/Searcher/SearchBar.tsx';
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
    <div className="App">
      <h1>Infinite Scroll Image Gallery</h1>
      {selectedImage ? (
        <ImageDetail image={selectedImage} setSelectedImage={setSelectedImage} />
      ) : (
        <>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ImageList images={filteredImages} loading={loading} error={error} setSelectedImage={setSelectedImage} />
          <div ref={loader} />
        </>
      )}
    </div>
  );
}

export default App;
