"use client";

import React, { useState } from "react";
import Navigation from "../navigation/navigation";
import Logo from "../logo/logo";
import Rank from "../Rank/Rank";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import { CLARIFAI_CONFIG_OBJECT } from "@/utils/clarifaiConfig";
import FaceSquare from "../FaceSquare/FaceSquare";
import { Spinner } from "../spinner/spinner.component";

const AppContainer = () => {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [recongnizedFaces, setRecongnizedFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onInputChange = (event) => {
    if (error) {
      setError(false);
    }
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
    setLoading(true);
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
          setRecongnizedFaces(result.outputs?.[0]?.data.regions ?? []);
          if (result.status.description === "Failure") {
            setError(true);
            setImgUrl("");
          }
          console.log(result);
        })
        // .then((result) => setImgUrl(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      setImgUrl("");
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      {imgUrl.length > 0 && !loading && !error && (
        <div className="w-70 center ma2 relative">
          {recongnizedFaces?.map((face, index) => {
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
      {error && (
        <div className="center tc ma3 bg-light-green">
          <p className="red b f3 ">
            ERROR - PLEASE PROVIDE A VALID IMAGE OR TRY LATER
          </p>
        </div>
      )}
      {loading && (
        <div className="center ">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default AppContainer;
