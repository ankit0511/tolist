import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home d-flex align-items-center">
      {/* Left Section: Text */}
      <div className="home-text d-flex flex-column align-items-start">
        <h1>
          Welcome to the <br /> Ultimate To-Do App
        </h1>
        <p>
          Manage your tasks efficiently and stay organized <br />
          with the world's most powerful task management app.
        </p>
        <button className="home-btn p-2">Start Organizing</button>
      </div>

      {/* Right Section: Image */}
      <div className="home-image">
        <img
          src="https://play-lh.googleusercontent.com/QhQaJhzdWrZ08HfrsqylDUFIzMjcUxh0UNvFqeZRSpGsTSLC3UyLLq5u9ggKOr-8tQ=w240-h480-rw"
          alt="To-Do Illustration"
        />
      </div>
    </div>
  );
};

export default Home;
