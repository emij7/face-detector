"use client";

import React, { useState } from "react";
import Navigation from "../navigation/navigation";
import Logo from "../logo/logo";
import Rank from "../Rank/Rank";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import { CLARIFAI_CONFIG_OBJECT } from "@/utils/clarifaiConfig";
import FaceSquare from "../FaceSquare/FaceSquare";

const AppContainer = () => {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [recongnizedFaces, setRecongnizedFaces] = useState([]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const onSubmit = () => {
    fetchApi();
  };

  //Clarifai config and fetch
  const raw = JSON.stringify({
    user_app_id: {
      user_id: CLARIFAI_CONFIG_OBJECT.USER_ID,
      app_id: CLARIFAI_CONFIG_OBJECT.APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: input,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + CLARIFAI_CONFIG_OBJECT.PAT,
    },
    body: raw,
  };

  const fetchApi = async () => {
    try {
      await fetch(
        "https://api.clarifai.com/v2/models/" +
          CLARIFAI_CONFIG_OBJECT.MODEL_ID +
          "/versions/" +
          CLARIFAI_CONFIG_OBJECT.MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      )
        .then(setImgUrl(input))
        .then((response) => response.json())
        .then((result) => {
          setRecongnizedFaces(result.outputs?.[0]?.data.regions);
          console.log(result);
        })
        // .then((result) => setImgUrl(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      setImgUrl("");
      console.log(error);
    }
  };

  return (
    <>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      {imgUrl.length > 0 && (
        <div className="w-50 center ma2 relative">
          {recongnizedFaces.map((face, index) => {
            return (
              <FaceSquare
                key={index}
                top={face?.region_info?.bounding_box?.top_row ?? 0}
                right={face?.region_info?.bounding_box?.right_col ?? 0}
                bottom={face?.region_info?.bounding_box?.bottom_row ?? 0}
                left={face?.region_info?.bounding_box?.left_col ?? 0}
                percent={face?.value ?? 0}
              />
            );
          })}
          <img className="w-100" src={imgUrl} alt="Image with face detection" />
        </div>
      )}
    </>
  );
};

export default AppContainer;
