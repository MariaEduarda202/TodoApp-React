import { useState ,useEffect } from "react";


export default function TodoForm() {
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [creationTime, setCreationTime] = useState("");
  const [countTask, setCountTask] = useState(0);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
        id: crypto.randomUUID(),
        title: newTask,
        description: newDescription,
        complete: false,
        createdAt: new Date().toLocaleString(),
      };
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setNewTask("");
    setNewDescription("");
    setCreationTime("");
    setCountTask((currentCount) => currentCount + 1);
  }

  function deleteTask(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    setCountTask((currentCount) => currentCount - 1); 
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="TodoForm">
        <div className="list-item">
          <label htmlFor="item">Task Name:</label>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
          />

          <label>Task description:</label>
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            type="text"
          />
          <input type="submit" value="Create a Todo" id="item" />
        </div>
      </form>

      <div className="add-new-task">
        <h1>Today</h1>

        <h2>Todo</h2>
        <p>Total tasks: {countTask}</p> 
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div>
                <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
                {todo.description && <p>{todo.description}</p>}
                <p>{` ${todo.createdAt}`}</p>
              </div>
              <button onClick={() => deleteTask(todo.id)} className="delete-btn">
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
