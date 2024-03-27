import React from "react";
import quiz from "../assets/quiz.png"

const Banner = () => {
  return (
    <div className=" bg-orange-400 h-[400px] flex justify-center items-center gap-8">
      <div className="">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Quiz Master
        </h1>
        <p className="text-lg text-gray-600">
          Test your knowledge with our quizzes!
        </p>
      </div>
      <div>
        <img src={quiz} alt="" />
      </div>
    </div>
  );
};

export default Banner;
