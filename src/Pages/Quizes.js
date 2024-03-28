import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Quizes = () => {
  const { name } = useParams();

  const [questions, setQuestions] = useState([
    {
      ques: "What is MySQL?",
      options: [
        "A relational database management system (RDBMS)",
        "A programming language",
        "An operating system",
        "A web framework",
      ],
      ans: "A relational database management system (RDBMS)",
    },
    {
      ques: "Which of the following is NOT a valid data type in MySQL?",
      options: ["INT", "STRING", "VARCHAR", "BOOLEAN"],
      ans: "STRING",
    },
    {
      ques: "What does the SQL command 'SELECT * FROM table_name;' do in MySQL?",
      options: [
        "Deletes all records from the table",
        "Updates all records in the table",
        "Retrieves all columns and records from the table",
        "Creates a new table with all columns and records",
      ],
      ans: "Retrieves all columns and records from the table",
    },
    {
      ques: "Which SQL keyword is used to add new rows of data into a MySQL table?",
      options: ["ADD", "INSERT", "UPDATE", "CREATE"],
      ans: "INSERT",
    },
    {
      ques: "What does the SQL command 'DELETE FROM table_name WHERE condition;' do in MySQL?",
      options: [
        "Deletes all records from the table",
        "Updates all records in the table",
        "Deletes specific records from the table based on the condition",
        "Deletes the table itself",
      ],
      ans: "Deletes specific records from the table based on the condition",
    },
  ]);

  const [questionnaireId, setQuestionnaireId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExperiment, setShowExperiment] = useState(false);
  const [experimentStart, setExperimentStart] = useState(false);

  // useEffect(() => {
  //   const handleGetQuestionId = async() => {
  //     try{
  //       const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/questionnaire?storeName=${name}`)
  //       const id = await res.data.id;
  //       setQuestionnaireId(id);
  //     }
  //     catch(error) {
  //       console.log(error);
  //     }
  //   };
  //   handleGetQuestionId();
  // }, [name]);

  // useEffect(() => {
  //   const handleGetQuestions = async() => {
  //    try{
  //     const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/questionnaire/${questionnaireId}/question`)
  //     const questions = await res.data.questions;
  //     setQuestions(questions);
  //    }
  //    catch(error){
  //     console.log(error);
  //    }
  //   };

  //   handleGetQuestions();
  // }, [questionnaireId]);

  const handleAnswerSelection = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleNextQuestion = () => {
    if(selectedOption === null){
      toast.error("Please select a option");
      return;
    }
    if (selectedOption !== null) {
      const updatedAnswers = [...answers, selectedOption];
      setAnswers(updatedAnswers);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleSubmitAns = () => {
    if(selectedOption === null){
      toast.error("Please select a option");
      return;
    }
    if (selectedOption !== null) {
      const updatedAnswers = [...answers, selectedOption];
      if (updatedAnswers.length === questions.length) {
        toast.success("Quiz submitted")
        setAnswers(updatedAnswers);
      } else {
        return toast.error("You have already submitted the answers");
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
    setShowExperiment(true);
  };

  const startExperiment = () => {
    console.log("Experiment started");
    // axios.post(`${process.env.REACT_APP_BASE_URL}/questionnaire/${questionnaireId}`)
    // .then(() => {
    //   setExperimentStart(true);
    // })
    // .catch(err => console.log(err));

    setExperimentStart(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="pt-4 pb-8 text-center bg-purple-600">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6">
        Quiz for <span className="text-orange-400 uppercase">{name}</span>
      </h3>
      <div
        className="w-full md:w-[80%] lg:w-[70%] bg-white  px-4 pb-4 md:px-8 md:pb-6 my-5 mx-auto rounded-lg
        relative"
      >
        <div className="absolute top-[-4%] left-[44%] md:left-[47%] bg-green-400 w-[40px] h-[40px] z-50 rounded-full text-white py-2 ">
          <p className="text-base mx-auto">
            {currentQuestionIndex + 1}/{questions.length}
          </p>
        </div>
        <div className="">
          <progress
            className="progress progress-accent w-full mx-auto mb-4 md:mb-6"
            value={progress}
            max="100"
          ></progress>
        </div>
        {currentQuestion && (
          <div className="px-4 md:px-12 pt-5 pb-8 h-full md:h-[340px]">
            <p className="text-xl md:text-xl lg:text-2xl py-4 mb-8 mx-auto w-[95%] text-blue-400 font-bold">
              {currentQuestion.ques}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 justify-center">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`text-sm md:text-base lg:text-lg m-2 px-4 py-2 rounded border-blue-400 border-2 shadow-md transition duration-300 ease-in-out transform hover:scale-95 ${
                    selectedOption === option
                      ? "bg-blue-400 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleAnswerSelection(option)}
                >
                  <span>{index + 1}. </span> {option}
                </button>
              ))}
            </div>
          </div>
        )}
        {currentQuestionIndex === questions.length - 1 ? (
          <div>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleSubmitAns}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        )}
        {showExperiment && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={startExperiment}
          >
            Start Experiment
          </button>
        )}
        {experimentStart && <p>Experiment has started</p>}
      </div>
    </div>
  );
};

export default Quizes;
