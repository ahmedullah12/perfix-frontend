import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Redis",
    value: "redis",
  },
  {
    name: "MySQL",
    value: "mysql",
  },
  {
    name: "DynamoDB",
    value: "dynamodb",
  },
];

const Cattegories = () => {
  return (
    <div className="my-4 text-center">
      <h3 className="text-2xl">Here are the categories</h3>
      <p>Select one from them.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto my-5">
        {categories.map((category, i) => (
          <Link
          to={`/quiz/${category.value}`}
            className="border-2 border-gray-400 mx-auto px-[70px] py-[20px] text-lg font-semibold text-center rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-blue-500 hover:text-white"
            key={i}
          >
              {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cattegories;
