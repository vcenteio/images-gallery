import ImageCard from "./ImageCard";
import { Container, Row, Col } from "react-bootstrap";

const Gallery = ({ images, handleDeleteImage }) => {
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

export default Gallery;
