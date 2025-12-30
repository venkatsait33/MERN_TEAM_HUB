import React from "react";
import Navbar from "../components/Navbar";
import HomePageLayout from "../components/HomePageLayout";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <HomePageLayout />
      </div>
    </div>
  );
};

export default HomePage;
