import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_KEY}&query=${word}`
    )
      .then((result) => result.json())
      .then((data) => {
        setImages([data, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
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
