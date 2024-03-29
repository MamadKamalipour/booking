import React from "react";
import "./index.scss";

const InstagramFeedCard = ({ image, link }) => {
  return (
    <>
      <img
        className="image"
        src={image}
        alt="cardimage"
        onClick={() => window.open(link, "_blank", "noreferrer")}
      />
    </>
  );
};

export default InstagramFeedCard;
