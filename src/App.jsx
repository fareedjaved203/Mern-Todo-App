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
  const [isHidden, setIsHidden] = useState(false);
  const [accordianChecked, setAccordianChecked] = useState(false);
  const [mode, setMode] = useState("input");
  const [isOpen, setIsOpen] = useState(false);
  const [confirmId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make GET request to backend API
        const response = await axios.get("http://localhost:8000/");
        // Update component state with retrieved data
        if (mode === "input") {
          return setTodos(response.data);
        } else if (mode === "pending") {
          const showPending = response.data.filter((val) => {
            return val.status === "pending";
          });
          console.log(`pending: ${showPending}`);
          return setTodos(showPending);
        } else {
          const showCompleted = response.data.filter((val) => {
            return val.status === "completed";
          });
          console.log(`completed: ${showCompleted}`);
          return setTodos(showCompleted);
        }
      } catch (error) {
        // Handle errors
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [todos, mode]);

  const toggleAccordion = (id) => {
    setIsOpen(!isOpen);
    setId(id);
  };

  const toggleMode = () => {
    // Toggle between input, Text1, and Text2
    if (mode === "input") {
      setMode("completed");
    } else if (mode === "completed") {
      setMode("pending");
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
      // addTodo();
      sendDataToBackend();
      setInputValue("");
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconToggle = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/${id}`, {
        status: "completed",
      });
    } catch (error) {
      console.log(error);
    }
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
  const formattedDate = (date) => {
    const doIt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return doIt;
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
                  {mode === "completed" && <p>Completed Tasks</p>}
                  {mode === "pending" && <p>Pending Tasks</p>}
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
                  <li
                    key={value._id}
                    onClick={() => toggleAccordion(value._id)}
                  >
                    <Container>
                      <Row>
                        <Col>
                          {value.status === "completed" ? (
                            <BsCheckCircleFill
                              size={20}
                              style={{ color: "black" }}
                            />
                          ) : (
                            <BsCircle
                              onClick={() => handleIconToggle(value._id)}
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
                      {isOpen && confirmId === value._id && (
                        <Container>
                          <Row>
                            <b>Start Time:</b> {value.startTime}
                          </Row>
                          <Row>
                            <b>Completion Time:</b>
                            {value.completionTime}
                          </Row>
                          <Row>
                            <b>Status:</b> {value.status}
                          </Row>
                        </Container>
                      )}
                    </Container>
                    <hr />
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
