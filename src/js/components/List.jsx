import React, { useState } from "react";
import { useEffect } from "react";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState("andres");
  const [isVisible, setIsVisible] = useState(null);
  const [PlaceholderValue, setPlaceholderValue] = useState("");
  const [currentUser, setCurrentUser] = useState("andres");
  const Api_URL = "https://playground.4geeks.com/todo";

  function sendData(e) {
    e.preventDefault();
  }

  const CreateTask = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      fetch(Api_URL + `/todos/${user}`, {
        method: "POST",

        body: JSON.stringify({
          label: inputValue,
          is_done: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => Tasklist())
        .catch((error) => {
          console.log(error);
        });
      setInputValue("");
    }
  };

  const DeleteTask = (todoid) => {
    fetch(Api_URL + `/todos/${todoid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => Tasklist())
      .catch((error) => {
        console.log(error);
      });
  };

  function CreateUser() {
    fetch(Api_URL + `/users/${user}`, {
      method: "POST",
      body: JSON.stringify({
        name: user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function DeleteList() {
    tasks.map((task) => {
      fetch(Api_URL + `/todos/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok);
          console.log(resp.status);
        })
        .then(() => {
          Tasklist();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  function Tasklist() {
    fetch(Api_URL + `/users/${user}`)
      .then((resp) => {
        if (!resp.ok) {
          return alert("user doesnt exist, please select a valid username");
        }
        console.log(resp.ok);
        console.log(resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data.todos);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const Capitalize = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  const TaskCounter = (array) => {
    if (array.length === 1) {
      return `${array.length} Item left`;
    }
    return `${array.length} Items left`;
  };

  function Visibility(index) {
    if (isVisible == index) {
      return "visible";
    }
    return "hidden";
  }

  const Placeholder = (array) => {
    if (array.length === 0) {
      return "No tasks, add a task";
    }
    return "What needs to be done?";
  };

  const ChangeUser = () => {
    Tasklist();
    setPlaceholderValue("");
    
  };

  useEffect(() => {
    CreateUser();
    Tasklist();
  }, []);

  return (
    <>
    <form onSubmit={sendData} className="d-flex justify-content-center">
      <ul className="todo-list list-group col-5 list-group-flush ">
        <li className="list-group-item ps-5">
          <input
            type="text"
            className="input-field form-control"
            placeholder={Placeholder(tasks)}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={CreateTask}
          />
        </li>
        {tasks.map((task) => {
          return (
            <li
              className="list-group-item ps-5 list-item"
              key={task.id}
              id={task.id}
              onMouseEnter={(e) => setIsVisible(e.target.id)}
              onMouseLeave={() => setIsVisible(null)}
            >
              {Capitalize(task.label)}
              <i
                className="delete-marker"
                key={task.id}
                style={{ visibility: `${Visibility(task.id)}` }}
                onClick={() => DeleteTask(task.id)}
              >
                X
              </i>
            </li>
          );
        })}
        <li className="task-counter list-group-item ps-3">
          {TaskCounter(tasks)}
        </li>
      </ul>
    </form>
    <div className="col-2 ms-auto  button-stuff">
        <div className="d-flex flex-column">
          <label for="username">current user : {currentUser}</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => {
              setUser(e.target.value), setPlaceholderValue(e.target.value);
            }}
            value={PlaceholderValue}
          ></input>
          <button
            type="button"
            className="btn btn-primary mt-1"
            onClick={() => {
              ChangeUser();
            }}
          >
            Change User
          </button>
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={DeleteList}
          >
            Delete Todo List
          </button>
        </div>
      </div>
      </>
  );
};
export default List;
