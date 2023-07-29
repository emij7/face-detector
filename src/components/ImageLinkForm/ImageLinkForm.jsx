import React from "react";

const ImageLinkForm = () => {
  return (
    <div className="flex flex-column">
      <p className="f3 center pa2 tc">{`This will detect faces in pictures. ¡Give it a try!`}</p>
      <div className="flex flex-column ">
        <input
          type="text"
          placeholder="Provide an url here..."
          className="f4 pa2 w-70 center "
        />
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-green pointer center">
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
