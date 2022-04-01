import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ImageCard({ imageData, handleDelete, handleSave }) {
  const getDescription = () => {
    return (imageData.description || imageData.alt_description)
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageData.urls.thumb} />
      <Card.Body>
        <Card.Title>{getDescription()}</Card.Title>
        <Card.Text>Created by {imageData.user.name}</Card.Text>
        <Button variant="primary" onClick={() => handleDelete(imageData._id)}>
          Delete
        </Button>
        <Button
          variant="secondary"
          className="mx-1"
          onClick={() => handleSave(imageData._id)}
        >
          Save
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ImageCard;
