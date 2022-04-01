import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Welcome from "./components/Welcome";
import Gallery from "./components/Gallery";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const RANDOM_IMAGE_ENDPOINT = "/new-image";
const IMAGES_ENDPOINT = "/images";

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const serverResponse = await axios.get(`${API_URL}${IMAGES_ENDPOINT}`);
      setImages(serverResponse.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.get(
        `${API_URL}${RANDOM_IMAGE_ENDPOINT}?query=${word}`
      );
      setImages([{ ...serverResponse.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setWord("");
  };

  const handleDeleteImage = (_id) => {
    setImages(images.filter((image) => image._id !== _id));
  };

  const handleSaveImage = async (_id) => {
    const imageToBeSaved = images.find((image) => image._id === _id);
    try {
      const serverResponse = await axios.post(
        `${API_URL}${IMAGES_ENDPOINT}`,
        imageToBeSaved
      );
      console.log(serverResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const Content = () => {
    return images.length ? (
      <Gallery
        images={images}
        handleDeleteImage={handleDeleteImage}
        handleSaveImage={handleSaveImage}
      />
    ) : (
      <Welcome />
    );
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Content />
    </div>
  );
}

export default App;
