import { useEffect, useState, useRef } from 'react';

// ****** 잘 모르는 부분
// 1. async, await 구문
// 2. useRef, POST 부분 다시 복습해보기

function Home() {
  const [todos, setTodos] = useState([]);
  const getTest = async () => {
    const json = await (await fetch(`http://localhost:3001/todos`)).json();
    setTodos(json);
  };
  useEffect(() => {
    getTest();
  }, []);

  const newTodoRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();

    console.log(newTodoRef.current.value);

    fetch(`http://localhost:3001/todos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        todo: newTodoRef.current.value,
      }),
    }).then((response) => {
      if (response.ok) {
        alert('생성이 완료 되었습니다.');
        getTest();
        document.querySelector('#write-form input').value = '';
      }
    });
  }

  return (
    <div className="container">
      <h1 className="title">To Do List</h1>
      <div className="contents">
        <div className="write-wrap">
          <form id="write-form" onSubmit={onSubmit}>
            <input
              type="text"
              max="25"
              placeholder="오늘 할 일을 입력해 주세요."
              ref={newTodoRef}
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
