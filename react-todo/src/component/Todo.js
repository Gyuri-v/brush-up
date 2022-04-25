import { useState, useRef } from 'react';

function Todo({ todo }) {
  const [todoText, setTodoText] = useState(todo.todo);
  const [isDone, setIsDone] = useState(todo.isDone);
  const [edited, setEdited] = useState(false);
  const modifyTodoRef = useRef(null);

  function onChangeTodo(event) {
    setTodoText(event.target.value);
  }

  function onClickModify(event) {
    setEdited(!edited);

    if (edited) {
      fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          todo: modifyTodoRef.current.value,
          id: todo.id,
          isDone: todo.isDone,
        }),
      }).then((reaponse) => {
        if (reaponse.ok) {
          return;
        }
      });
    }
  }

  function onClickDone(event) {
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        todo: todo.todo,
        id: todo.id,
        isDone: !isDone,
      }),
    }).then((reaponse) => {
      if (reaponse.ok) {
        setIsDone(!isDone);
      }
    });
  }

  function onClickDelite(event) {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          alert('삭제가 완료되었습니다.');
          event.target.offsetParent.remove();
          document.querySelector('#write-form input[type:text]').value = '';
        }
      });
    }
  }

  return (
    <li
      id={todo.id}
      className={(edited ? 'edited' : '') + ' ' + (isDone ? 'off' : '')}
    >
      <input type="checkbox" checked={isDone} onChange={onClickDone} />
      <input
        type="text"
        value={todoText}
        onChange={onChangeTodo}
        disabled={edited ? false : true}
        ref={modifyTodoRef}
      />
      <div className="btn-wrap">
        <button type="button" className="btn-modify" onClick={onClickModify}>
          {edited ? '완료' : '수정'}
        </button>
        <button type="button" className="btn-delete" onClick={onClickDelite}>
          X
        </button>
      </div>
    </li>
  );
}

export default Todo;
