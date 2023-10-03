"use client";

import React, { useEffect, useState } from "react";
import Navigation from "../navigation/navigation";
import Logo from "../logo/logo";
import Rank from "../Rank/Rank";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import { CLARIFAI_CONFIG_OBJECT } from "@/utils/clarifaiConfig";
import FaceSquare from "../FaceSquare/FaceSquare";
import { Spinner } from "../spinner/spinner.component";
import SignIn from "../Signin/SignIn";
import { url } from "@/utils/connection";

const faceDetectUser = JSON.parse(localStorage.getItem("faceDetectUser"));
const AppContainer = ({ user }) => {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [recongnizedFaces, setRecongnizedFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      await fetch(url + "/profile/" + faceDetectUser.user, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "datita");
          if (data) {
            setUserData(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (event) => {
    if (error) {
      setError(false);
    }
    setInput(event.target.value);
  };
  const onSubmit = () => {
    fetchApi();
  };

  useEffect(() => {
    if (faceDetectUser) {
      getUserData();
    }
  }, [faceDetectUser]);

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

  const updateFaceAmount = async (amount) => {
    try {
      await fetch(url + "/addRecognizedFaces", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.id,
          amount: amount,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            setUserData({ ...userData, facesAmount: data.facesAmount });
          }
        });
    } catch (error) {
      console.log(error);
    }
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
          if (result.outputs?.[0]?.data.regions?.length > 0) {
            updateFaceAmount(result.outputs?.[0]?.data.regions?.length);
          }
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
      {/* <SignIn /> */}
      <Logo />
      {userData && <p className="f3 center tc">Welcome {userData?.name}</p>}
      <Rank totalDetections={userData?.facesAmount} />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      {imgUrl.length > 0 && !loading && !error && (
        <div className="w-70 center ma2 relative">
          {recongnizedFaces.length === 0 && (
            <div className="center tc ma3 bg-light-green">
              <p className="green b f3 ">NO FACES DETECTED</p>
            </div>
          )}
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
