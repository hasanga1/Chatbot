import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link to={"/"}>
        <img src="echochat.png" alt="echochat" width={'150px'} height={'50px'}/>
      </Link>
    </div>
  );
};

export default Logo;
