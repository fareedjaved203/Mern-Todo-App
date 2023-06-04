import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaGripLines } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [accordianChecked, setAccordianChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [mode, setMode] = useState("input");
  const [itemStatus, setItemStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make GET request to backend API
        const response = await axios.get("http://localhost:8000/");
        // Update component state with retrieved data
        setTodos(response.data);
      } catch (error) {
        // Handle errors
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [todos]);

  const toggleMode = () => {
    // Toggle between input, Text1, and Text2
    if (mode === "input") {
      setMode("text1");
    } else if (mode === "text1") {
      setMode("text2");
    } else {
      setMode("input");
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden); // Toggle the visibility state
    setAccordianChecked(!accordianChecked);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
      sendDataToBackend();
    }
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), task: inputValue, status: isCompleted },
      ]);
      setInputValue("");
    }
  };

  const removeTodo = async (id) => {
    // setTodos(todos.filter((value) => value._id !== id));
    try {
      const response = await axios.delete(`http://localhost:8000/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconToggle = (id) => {
    setIsChecked(!isChecked);
    completedTask();
    let status = "pending";
    if (isCompleted === true) {
      status = "completed";
    }
    // setItemStatus((prevStatus) => ({
    //   ...prevStatus,
    //   [id]: !prevStatus[id], // Toggle the status for the item
    // }));
    // setTodos(
    //   todos.map((val) => {
    //     if (val.id === id) {
    //       return { ...todos, status };
    //     }
    //     return val;
    //   })
    // );
  };

  const completedTask = () => {
    setIsCompleted(!isCompleted);
    console.log(isCompleted);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendDataToBackend = async () => {
    try {
      await axios.post("http://localhost:8000/", {
        inputValue,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="todo-structure">
          <div className="item-adder">
            <Container>
              <Row>
                <Col>
                  <FaGripLines
                    size={30}
                    style={{ color: "white" }}
                    onClick={toggleMode}
                  />
                </Col>
                <Col xs={8}>
                  {mode === "input" && (
                    <input
                      placeholder="To do list"
                      type="text"
                      value={inputValue}
                      onKeyPress={handleKeyPress}
                      onChange={handleChange}
                    />
                  )}
                  {mode === "text1" && <p>Completed Tasks</p>}
                  {mode === "text2" && <p>Pending Tasks</p>}
                </Col>
                <Col>
                  {accordianChecked ? (
                    <IoIosArrowUp
                      size={30}
                      style={{ color: "white" }}
                      onClick={toggleVisibility}
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      size={30}
                      style={{ color: "white" }}
                      onClick={toggleVisibility}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          </div>
          <div className="item-display">
            {isHidden ? null : (
              <ul>
                {todos.map((value) => (
                  <li key={value.id}>
                    <Container>
                      <Row>
                        <Col>
                          {isChecked ? (
                            <BsCheckCircleFill
                              onClick={() => handleIconToggle(value.id)}
                              size={20}
                              style={{ color: "black" }}
                            />
                          ) : (
                            <BsCircle
                              onClick={() => handleIconToggle(value.id)}
                              size={20}
                              style={{ color: "black" }}
                            />
                          )}
                        </Col>
                        <Col xs={8}>{value.task}</Col>
                        <Col>
                          <RxDragHandleDots2
                            size={20}
                            style={{ color: "black" }}
                            onClick={() => removeTodo(value._id)}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <footer>&copy; 2023, Muhammad Fareed Javed. All Rights Reserved</footer>
      </div>
    </>
  );
};

export default App;
