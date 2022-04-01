import React from "react";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";

const onClickImage = ({ image }) => (
  <Zoom zoomMargin={100}>
    <img src={image} />
  </Zoom>
);

export default onClickImage;
