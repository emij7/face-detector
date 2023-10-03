"use client";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  const handleLogOut = () => {
    localStorage.removeItem("faceDetectUser");
  };
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link
        href={"/signin"}
        className="f3 link dim white underline pa3 pointer"
        onClick={handleLogOut}
      >
        Sign Out
      </Link>
    </nav>
  );
};

export default Navigation;
