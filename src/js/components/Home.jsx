import React from "react";
import List from "./List";

//create your first component
const Home = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center row mt-5">
        <h1 className="title col-12 text-center">todos</h1>
        <List />
      </div>
    </div>
  );
};

export default Home;
