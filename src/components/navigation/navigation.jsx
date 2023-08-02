"use client";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link
        href={"/signin"}
        className="f3 link dim white underline pa3 pointer"
      >
        Sign Out
      </Link>
    </nav>
  );
};

export default Navigation;
