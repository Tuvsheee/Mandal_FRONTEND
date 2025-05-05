import { useState, CSSProperties } from "react";
import { BounceLoader } from "react-spinners";
("react-spinners/ClipLoader");

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  return (
    <div className="sweet-loading  w-full h-screen bg-white absolute flex items-center justify-center">
      <BounceLoader
        color={"#5778BB"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
