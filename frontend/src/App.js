import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const RANDOM_IMAGE_ENDPOINT = "/new-image";

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

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

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const Gallery = () => {
    return (
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            <Col key={i} className="pb-3">
              <ImageCard imageData={image} handleDelete={handleDeleteImage} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  const Content = () => {
    return images.length ? <Gallery /> : <Welcome />;
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
