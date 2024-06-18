import React, { useState } from "react";
import "./App.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const [IsCompleted, setIsCompleted] = useState(false);
  const [isCurrentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    if (todoTitle === "" && todoDescription === "") {
      alert("empty todoo");
    } else {
      let newTodoItem = {
        title: todoTitle,
        description: todoDescription,
      };
      let updatedTodo = [...allTodo];
      updatedTodo.push(newTodoItem);
      setAllTodo(updatedTodo);

      localStorage.setItem("todoList", JSON.stringify(updatedTodo));
    }
  };

  const handleUpdatedTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdatedDescription = (value) => {
    console.log(value);
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateTodo = () => {
    let newTodo = [...allTodo];
    newTodo[isCurrentEdit] = currentEditedItem;
    setAllTodo(newTodo);
    setCurrentEdit("");
  };

  const handleDelete = (id) => {
    const newArray = [...allTodo];
    newArray.splice(id, 1);
    localStorage.setItem("todolist", JSON.stringify(newArray));
    setAllTodo(newArray);
  };
  const handleEdit = (id, item) => {
    setCurrentEdit(id);
    setCurrentEditedItem(item);
  };
  const handleCompleted = (index, item) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let completedOn = dd + "/" + mm + "/" + yy + "/" + h + "/" + m;
    let filteredItem = {
      title: item.title,
      description: item.description,
      completedOn: completedOn,
    };
    let newArr = [...completedTodos];
    newArr.push(filteredItem);
    setCompletedTodos(newArr);
    handleDelete(index);
    localStorage.setItem("completed", JSON.stringify(newArr));
  };

  const deleteCompltedTodo = (id) => {
    const newArr = [...completedTodos];
    newArr.splice(id, 1);
    setCompletedTodos(newArr);
    localStorage.setItem("completed", JSON.stringify(newArr));
  };
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>

            <input
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>

            <input
              type="text"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${IsCompleted === false && "active"}`}
            onClick={() => setIsCompleted(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${IsCompleted === true && "active"}`}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {IsCompleted === false &&
            allTodo.map((item, index) => {
              if (isCurrentEdit === index) {
                return (
                  <div className="edit__wrapper" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdatedTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Title"
                      rows={4}
                      onChange={(e) => handleUpdatedDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateTodo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDelete(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleCompleted(index, item)}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="check-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}
          {IsCompleted === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => deleteCompltedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
