import React, { useEffect, useState } from "react";
import axios from "axios";
import MapImage from "../assets/Harita.jpg";
import CameraRed from "../assets/camera-red.svg";
import CameraGreen from "../assets/camera-green.svg";

import { Card } from "./";

const Map = () => {
  const [dot, setDot] = useState({ xCoor: null, yCoor: null });
  const [cardVisibility, setCardVisibility] = useState(false);
  const [cardDeleteMode, setCardDeleteMode] = useState(false);
  const [cameraRotation, setCameraRotation] = useState(0);
  const [cameraName, setCameraName] = useState("");
  const [cameraIP, setCameraIP] = useState("");

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
    axios.get("http://192.168.2.59:3000").then((res) => {
      setCameraData(res.data);
    });
  };

  const handleAdd = () => {
    axios
      .post("http://192.168.2.59:3000/", {
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
    axios
      .delete(`http://192.168.2.59:3000/${selectedCameraData._id}`)
      .then((res) => {
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
            }}
            src={CameraGreen}
            alt="cameraGreen"
            className="w-5 h-5 absolute cursor-pointer"
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
