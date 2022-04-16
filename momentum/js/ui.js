// ------------------------------
// * backgorund
const bgElem = document.querySelector('.container > .bg');
const bgImgs = ['./img/0.jpg', './img/1.jpg', './img/2.jpg'];
const bgSeleted = bgImgs[Math.floor(Math.random() * 3)];

bgElem.style.backgroundImage = `url('${bgSeleted}')`;

// ------------------------------
// * clock
function getClock() {
  const clockElem = document.querySelector('.clock');
  const nowDate = new Date();
  const nowHours = String(nowDate.getHours()).padStart(2, '0');
  const nowMinutes = String(nowDate.getMinutes()).padStart(2, '0');
  const nowSeconds = String(nowDate.getSeconds()).padStart(2, '0');

  clockElem.innerText = `${nowHours}:${nowMinutes}`;
}

getClock();
setInterval(getClock, 1000);

// ------------------------------
// * login
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const loginBtn = document.querySelector('#login-form button');
const greeting = document.querySelector('#greeting');
const savedUserName = localStorage.getItem('username');

const HIDDEN = 'hidden';

function onLoginSubmit(event) {
  event.preventDefault();

  const userName = loginInput.value;
  loginInput.value = '';
  localStorage.setItem('username', userName);

  paintGreeting(userName);
}

function paintGreeting(userName) {
  greeting.innerText = `Hello ${userName}`;
  greeting.classList.remove(HIDDEN);
  loginForm.classList.add(HIDDEN);
}

if (savedUserName === null) {
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  paintGreeting(savedUserName);
}

// * todo list
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.querySelector('#todo-list');
const todos = [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');

  li.id = newTodo.id;
  span.innerText = newTodo.text;
  button.innerText = 'x';
  li.append(button);
  li.append(span);
  todoList.append(li);

  button.addEventListener('click', removeTodo);
}

function onTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  if (newTodo !== '') {
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
  }
}

todoForm.addEventListener('submit', onTodoSubmit);

const savedToDos = localStorage.getItem('todos');

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

// * quote
const quotes = [
  {
    quote:
      '많은 사람들이 뒤늦게야 이해하는 진실은, 고통을 피하려 할수록 더 고통스러워진다는 것이다. 다칠까 두려워하는 만큼씩 더 작고 하찮은 것들까지 당신을 괴롭히기 시작할 것이기 때문이다.',
    author: 'Thomas Merton',
  },
  {
    quote: '인간은 인생의 방향을 결정할 규칙을 가지고 있어야 한다.',
    author: 'John Wayne',
  },
  {
    quote:
      '실패가 나태함에 대한 유일한 징벌은 아니다. 다른 이들의 성공도 있지 않은가.',
    author: 'Jules Renard',
  },
  {
    quote: '교육의 목적은 비어 있는 머리를 열려 있는 머리로 바꾸는 것이다.',
    author: 'Malcolm Forbes',
  },
  {
    quote:
      "당신이 어떤 일을 해낼 수 있는지 누군가가 물어보면 대답해라. '물론이죠!' 그 다음 어떻게 그 일을 해낼 수 있을지 부지런히 고민하라.",
    author: 'Theodore Roosevelt',
  },
  {
    quote: '행동의 가치는 그 행동을 끝까지 이루는 데 있다.',
    author: 'Genghis Khan',
  },
  {
    quote: '나는 믿음을 존중하지만 우리를 가르치는 것은 의구심이다.',
    author: 'Wilson Mizner',
  },
  {
    quote: '행동 없는 말은 이상주의를 훼손한다.',
    author: 'Herbert Hoover',
  },
  {
    quote: '단순히 읽기 시작했다는 이유만으로 결코 책을 끝까지 읽지 말라.',
    author: 'John Witherspoon',
  },
  {
    quote: '인간의 삶 전체는 단지 한 순간에 불과하다. 인생을 즐기자.',
    author: 'Plutarch',
  },
];
const quoteElem = document.querySelector('#quote');
const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
const quoteElemQuote = quoteElem.querySelector('span:first-child');
const quoteElemAuthore = quoteElem.querySelector('span:last-child');
quoteElemQuote.innerText = selectedQuote.quote;
quoteElemAuthore.innerText = selectedQuote.author;

// * weather
