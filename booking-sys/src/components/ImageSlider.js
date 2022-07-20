import { useState } from "react";
import React from "react";

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = props.slides;
  const sliderStyle = {
    height: "100%",
    position: "relative",
  };
  const slideStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${data[currentIndex]})`,
  };
  const rightArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const leftArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div style={sliderStyle}>
      <div style={rightArrow} onClick={goToNext}>
        {">"}
      </div>
      <div style={leftArrow} onClick={goToPrevious}>
        {"<"}
      </div>
      <div style={slideStyle}></div>
    </div>
  );
};

export default ImageSlider;
