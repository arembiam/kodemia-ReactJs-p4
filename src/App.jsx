import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Este es el parámetro
    console.log("use effect todos:", todos);
  }, []); //Este es el arreglo de dependencias

  //Este se actualiza conforme vamos escribiendo en el input
  useEffect(() => {
    console.log("use effect text:", text);
  }, [text]);

  function addHandler() {
    if (text.trim().length > 0) {
      //Trim para quitar los espacios en blanco
      setTodos([text.trim(), ...todos]);
      setText("");
    }
  }

  function keyDownHandler(event) {
    if (event.key === "Enter") addHandler(); //Para que reconozca el enter como "Agregar"
  }

  function removeItem(index) {
    return () => {
      const filtered = todos.filter((item, innerIndex) => index !== innerIndex);
      setTodos(filtered); // !== NO ES IGUAL A
    };
  }

  console.log("todos:", todos);

  return (
    <main className="min-h-screen text-white p-5">
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          className="bg-white border-slate-400 border-2 text-black p-2 max-w-sm w-full"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={keyDownHandler}
          value={text}
        />
        <button
          onClick={addHandler}
          className="bg-blue-800 text-white p-2 rounded-md justify-center font-semibold"
        >
          Agregar
        </button>
      </div>

      <div className="w-full flex flex-col gap-2 p-3">
        {todos.map((item, index) => {
          return (
            <div
              className="w-full flex justify-center items-center gap-2 p2"
              key={`item-${index}`}
            >
              <p className="max-w-sm w-full text-black">{item}</p>
              <button
                className="bg-lime-400 text-black rounded-md p-2"
                onClick={removeItem(index)}
              >
                Done
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
