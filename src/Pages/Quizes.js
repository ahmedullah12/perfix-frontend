import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
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
    if (selectedOption !== null) {
      const updatedAnswers = [...answers, selectedOption];
      if(updatedAnswers.length === questions.length){
        setAnswers(updatedAnswers);
      }
      else{
        return alert("You have already submitted the answers")
      }
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
    setShowExperiment(true);
  }
  

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

  return (
    <div className="my-4 text-center">
      <h3 className="text-3xl font-bold my-4">Quiz: {name}</h3>
      {currentQuestion && (
        <div className="w-[90%] md:w-[60%] mx-auto">
          <p className="text-2xl my-2">{currentQuestion.ques}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`m-2 px-4 py-2 rounded border ${
                  selectedOption === option ? "bg-purple-600 text-white" : "bg-white border-gray-400"
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
      {
        showExperiment && <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={startExperiment}
      >
        Start Experiment
      </button>
      }
      {
        experimentStart && (
          <p>Experiment has started</p>
        )
      }
    </div>
  );
};

export default Quizes;
