import React, { useState } from "react";
import { useEffect } from "react";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(null);
  const Api_URL = "https://playground.4geeks.com/todo";

  function sendData(e) {
    e.preventDefault();
  }

  const CreateTask = (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      fetch(Api_URL + "/todos/andres", {
        method: "POST",

        body: JSON.stringify({
          label: inputValue,
          is_done: false,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => Tasklist());
      setInputValue("");
    }
  };

  const DeleteTask = (todoid) => {
    fetch(Api_URL + `/todos/${todoid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => Tasklist());
  };

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

  function CreateUser() {
    fetch(Api_URL + "/users/andres", {
      method: "POST",
      body: JSON.stringify({
        name: "andres",
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

  function DeleteUser() {
    fetch(Api_URL + "/users/andres", {
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
        CreateUser();
      })
      .then(() => {
        Tasklist();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Tasklist() {
    CreateUser();
    fetch(Api_URL + "/users/andres")
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data.todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    CreateUser();
    Tasklist();
  }, []);

  return (
    <form onSubmit={sendData} className="d-flex justify-content-center">
      <ul className="todo-list list-group col-5 list-group-flush">
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
        {tasks.map((task, index) => {
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
                key={index}
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
      <div className="col-2">
        <button type="button" onClick={DeleteUser}>
          Delete Todo List
        </button>
      </div>
    </form>
  );
};
export default List;
