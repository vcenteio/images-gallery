import { Spinner as Loader } from "react-bootstrap";

const spinnerStyle = {
  position: "absolute",
  top: "calc(50% - 1rem)",
  left: "calc(50% - 1rem)",
};

function Spinner() {
  return (
    <Loader
      animation="border"
      role="status"
      variant="primary"
      style={spinnerStyle}
    >
      <span className="visually-hidden">Loading...</span>
    </Loader>
  );
}

export default Spinner;
