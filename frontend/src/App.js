import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Welcome from "./components/Welcome";
import Gallery from "./components/Gallery";
import axios from "axios";
import Spinner from "./components/Spinner";
import Toast from "./components/Toast";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
const RANDOM_IMAGE_ENDPOINT = "/new-image";
const IMAGES_ENDPOINT = "/images";

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const serverResponse = await axios.get(`${API_URL}${IMAGES_ENDPOINT}`);
      setImages(serverResponse.data || []);
      setLoading(false);
      toast.success("Saved images downloaded");
    } catch (error) {
      toast.error(error.message);
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
      toast.info(`New image ${word} was found`);
    } catch (error) {
      toast.error(error.message);
    }
    setWord("");
  };

  const handleDeleteImage = async (_id) => {
    try {
      const serverResponse = await axios.delete(
        `${API_URL}${IMAGES_ENDPOINT}/${_id}`
      );
      if (serverResponse.status === 200) {
        setImages(images.filter((image) => image._id !== _id));
        toast.warn(`Image was deleted`);
      } else {
        console.log(serverResponse.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (_id) => {
    const imageToBeSaved = images.find((image) => image._id === _id);
    try {
      const serverResponse = await axios.post(
        `${API_URL}${IMAGES_ENDPOINT}`,
        imageToBeSaved
      );
      if (serverResponse.data.inserted_id) {
        const updatedImages = images.map((image) =>
          image._id === _id ? { ...image, saved: true } : image
        );
        setImages(updatedImages);
        toast.info(`Image ${imageToBeSaved.title} was saved`);
      }
    } catch (error) {
      toast.error(error.message);
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
      {(!loading && (
        <div>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Content />
        </div>
      )) || <Spinner />}
      <Toast />
    </div>
  );
}

export default App;
