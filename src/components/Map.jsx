import React, { useEffect, useState } from "react";
import axios from "axios";
import MapImage from "../assets/Harita.jpg";
import CameraRed from "../assets/camera-red.svg";
import CameraGreen from "../assets/camera-green.svg";

import { Card } from "./";

const Map = () => {
  const API_URL = "http://192.168.1.40:3000";

  const [dot, setDot] = useState({ xCoor: null, yCoor: null });
  const [cardVisibility, setCardVisibility] = useState(false);
  const [cardDeleteMode, setCardDeleteMode] = useState(false);
  const [cameraRotation, setCameraRotation] = useState(0);
  const [cameraName, setCameraName] = useState("");
  const [cameraIP, setCameraIP] = useState("");
  const [cameraStatus, setCameraStatus] = useState(false);

  const [cameraData, setCameraData] = useState([]);

  const [selectedCameraData, setSelectedCameraData] = useState();

  useEffect(() => {
    getCameraData();
  }, []);

  const handleDot = (e) => {
    clearInputs();
    setDot({
      xCoor: (((e.clientX - 10) / window.innerWidth) * 100).toFixed(2),
      yCoor: (((e.clientY - 10) / window.innerHeight) * 100).toFixed(2),
    });
    setCardVisibility(true);
  };

  const getCameraData = () => {
    axios.get(API_URL).then((res) => {
      setCameraData(res.data);
    });
  };

  const handleAdd = async () => {
    await axios
      .post(API_URL, {
        cameraName,
        cameraCoordinate: { xCoor: dot.xCoor, yCoor: dot.yCoor },
        cameraIP,
        cameraRotation,
      })
      .then((res) => {
        clearInputs();
        getCameraData();
      });
  };

  const handleDelete = () => {
    axios.delete(`${API_URL}/${selectedCameraData._id}`).then((res) => {
      clearInputs();
      getCameraData();
    });
  };

  const clearInputs = () => {
    setCardVisibility(false);
    setCardDeleteMode(false);
    setCameraName("");
    setCameraIP("");
    setCameraRotation(0);
    setDot({ xCoor: null, yCoor: null });
    setSelectedCameraData(null);
  };

  return (
    <div className="flex justify-center">
      <img src={MapImage} alt="mapImage" onClick={(e) => handleDot(e)} />
      {dot.xCoor && dot.yCoor && (
        <img
          src={CameraRed}
          alt="cameraRed"
          className="w-5 h-5 absolute"
          style={{
            top: dot.yCoor + "%",
            left: dot.xCoor + "%",
            transform: `rotate(${cameraRotation}deg)`,
          }}
        />
      )}
      <Card
        visibility={cardVisibility}
        cardDeleteMode={cardDeleteMode}
        selectedCameraData={selectedCameraData}
        cameraRotation={cameraRotation}
        setCameraRotation={setCameraRotation}
        cameraName={cameraName}
        setCameraName={setCameraName}
        cameraIP={cameraIP}
        setCameraIP={setCameraIP}
        cameraStatus={cameraStatus}
        coorData={dot}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        clearInputs={clearInputs}
      />
      {cameraData &&
        cameraData.map((camera, index) => (
          <img
            key={index}
            onClick={() => {
              setSelectedCameraData(camera);
              setCardVisibility(true);
              setCardDeleteMode(true);
              setDot({
                xCoor: camera.cameraCoordinate.xCoor,
                yCoor: camera.cameraCoordinate.yCoor,
              });
              setCameraName(camera.cameraName);
              setCameraIP(camera.cameraIP);
              setCameraRotation(camera.cameraRotation);
              setCameraStatus(camera.cameraStatus);
            }}
            src={camera.cameraStatus ? CameraGreen : CameraRed}
            alt="cameraGreen"
            className="w-5 h-5 absolute cursor-pointer animate-pulse"
            style={{
              top: camera.cameraCoordinate.yCoor + "%",
              left: camera.cameraCoordinate.xCoor + "%",
              transform: `rotate(${camera.cameraRotation}deg)`,
            }}
          />
        ))}
    </div>
  );
};

export default Map;
