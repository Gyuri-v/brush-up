import { useEffect, useState, useRef } from 'react';
import Todo from './Todo';

function Home() {
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState('');
  const newTodoRef = useRef(null);

  const getTest = async () => {
    const json = await (await fetch(`http://localhost:3001/todos`)).json();
    setTodos(json);
  };

  useEffect(() => {
    getTest();
  }, []);

  function onSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3001/todos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        todo: newTodoRef.current.value,
        isDoen: false,
      }),
    }).then((response) => {
      if (response.ok) {
        alert('생성이 완료 되었습니다.');
        getTest();
        document.querySelector('#write-form input').value = '';
      }
    });
  }

  function onChangeSort(event) {
    setSort(event.target.value);
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
        <div
          className={
            'todo-list ' +
            (sort == 'sortComplete'
              ? 'isComplete'
              : sort == 'sortIncomplete'
              ? 'isNotComplete'
              : '')
          }
        >
          <div className="select-wrap">
            <select onChange={onChangeSort}>
              <option value="">전체</option>
              <option value="sortComplete">완료만 보기</option>
              <option value="sortIncomplete">미완료만 보기</option>
            </select>
          </div>
          <ul>
            {todos.map((todos) => (
              <Todo todo={todos} key={todos.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
