import { useEffect, useState } from "react";
import "./todo.css";

const Todo = () => {
  //Getting the value from the localStorage
  const getLocalStorage = () => {
    const list = localStorage.getItem("mytodoList");

    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalStorage());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //Edit item
  const editItem = (id) => {
    const item_todo_edit = item.find((curEl) => curEl.id === id);
    setInputData(item_todo_edit.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  //Adding Item to the todo list
  const addItem = () => {
    if (!inputData) {
      alert("PLease fill the data!");
    } else if (inputData && toggleButton) {
      setItem(
        item.map((curEl) => {
          if (curEl.id === isEditItem) {
            return { ...curEl, name: inputData };
          } else return curEl;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, myNewInputData]);
      setInputData("");
    }
  };

  //Delete one item
  const deleteItem = (id) => {
    const updatedItems = item.filter((curEl) => curEl.id !== id);
    setItem(updatedItems);
  };

  //Remove all items
  const removeAll = () => {
    setItem([]);
  };

  //Storing the values in the localStorage
  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your list here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-Control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show our items */}
          <div className="showItems">
            {item.map((curEl) => {
              return (
                <div className="eachItem" key={curEl.id}>
                  <h3>{curEl.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn "
                      onClick={() => editItem(curEl.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curEl.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove All Button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
