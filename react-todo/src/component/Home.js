import { useEffect, useState } from 'react';
import dummy from '../db/data.json';

function Home() {
  const [todos, setTodos] = useState([]);
  const getTest = async () => {
    const json = await (await fetch(`http://localhost:3001/todos`)).json();
    console.log(json);
    setTodos(json);
    console.log(todos);
  };
  useEffect(() => {
    getTest();
  }, []);
  return (
    <div className="container">
      <h1 className="title">To Do List</h1>
      <div className="contents">
        <div className="write-wrap">
          <form action="" id="write-form">
            <input
              type="text"
              max="25"
              placeholder="오늘 할 일을 입력해 주세요."
              required
            />
            <button>추가</button>
          </form>
        </div>
        <div className="todo-list">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span>{todo.todo}</span>
                <button>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
