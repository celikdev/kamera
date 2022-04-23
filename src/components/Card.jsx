import React from "react";

import Close from "../assets/close.png";

const Card = ({
  visibility,
  cardDeleteMode,
  cameraRotation,
  setCameraRotation,
  coorData,
  cameraName,
  setCameraName,
  cameraIP,
  setCameraIP,
  cameraStatus,
  handleAdd,
  handleDelete,
  clearInputs,
}) => {
  return (
    <div
      style={{
        top: parseFloat(coorData.yCoor) + 3 + "%",
        left: parseFloat(coorData.xCoor) + 2 + "%",
      }}
      className={`${
        visibility
          ? "absolute z-[1] gap-2 w-60 h-60 flex flex-col items-center justify-between py-4 bg-white rounded-lg shadow-lg"
          : "hidden"
      }`}
    >
      <div className="flex flex-col items-center w-full gap-2">
        <div>
          {cardDeleteMode ? (
            <h1 className="font-Montserrat font-semibold text-sm">
              Kamera Bilgileri
            </h1>
          ) : (
            <h1 className="font-Montserrat font-semibold text-sm">
              Kamera Ekle
            </h1>
          )}
          <button
            onClick={() => clearInputs()}
            className="w-3 h-3 absolute top-4 right-4 transition-all hover:scale-110"
          >
            <img src={Close} className="" alt="CLOSE" />
          </button>
        </div>
        <input
          value={cameraName}
          onChange={(e) => setCameraName(e.target.value)}
          type="text"
          placeholder="Kamera İsmi"
          className="w-3/4 font-Montserrat font-semibold text-sm text-center border-2 border-black outline-none py-1 rounded-lg"
        />
        <input
          value={cameraIP}
          onChange={(e) => setCameraIP(e.target.value)}
          type="text"
          placeholder="IP Adresi"
          className="w-3/4 font-Montserrat font-semibold text-sm text-center border-2 border-black outline-none py-1 rounded-lg"
        />
        <input
          type="range"
          min="0"
          max="360"
          value={cameraRotation}
          className="w-3/4 cursor-pointer"
          onChange={(e) => setCameraRotation(e.target.value)}
        />
        <h1 className="font-Montserrat font-semibold text-xs -mt-2">
          Kamera Açısı : {cameraRotation + "°"}
        </h1>
      </div>
      {cardDeleteMode ? (
        <>
          <h1
            className={`${
              cameraStatus ? "text-green-400" : "text-red-600"
            } font-Montserrat font-semibold text-sm`}
          >
            {cameraStatus ? "Kamera Aktif" : "Kamera Pasif"}
          </h1>
          <button
            onClick={() => handleDelete()}
            className="border-2 transition-colors duration-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-transparent border-red-600 px-10 py-0.5 rounded font-Montserrat font-semibold text-sm"
          >
            Sil
          </button>
        </>
      ) : (
        <button
          onClick={() => handleAdd()}
          className="border-2 transition-colors duration-300 hover:bg-black hover:text-white hover:border-transparent border-black px-10 py-0.5 rounded font-Montserrat font-semibold text-sm"
        >
          Ekle
        </button>
      )}
    </div>
  );
};

export default Card;
