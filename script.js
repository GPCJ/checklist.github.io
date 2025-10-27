document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  // **로컬 스토리지 키**
  const STORAGE_KEY = 'customChecklist';

  // 1. 데이터 로드 및 렌더링
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach((todo) => {
      addTodoToDOM(todo.text, todo.completed);
    });
  }

  // 2. 항목을 DOM(화면)에 추가하는 함수
  function addTodoToDOM(text, completed = false) {
    const listItem = document.createElement('li');

    // 체크박스 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    // 텍스트 내용 생성
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-item-text';
    textSpan.textContent = text;

    // 삭제 버튼 생성
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '삭제';

    // 항목에 요소들을 추가
    listItem.appendChild(checkbox);
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);

    // 완료 상태에 따른 클래스 추가
    if (completed) {
      listItem.classList.add('completed');
    }

    // 이벤트 리스너 설정

    // 체크박스 상태 변경 시
    checkbox.addEventListener('change', () => {
      listItem.classList.toggle('completed'); // 클래스 토글
      saveTodos(); // 변경 사항 저장
    });

    // 삭제 버튼 클릭 시
    deleteButton.addEventListener('click', () => {
      listItem.remove(); // 항목 제거
      saveTodos(); // 변경 사항 저장
    });

    // 리스트에 항목 추가
    todoList.appendChild(listItem);
  }

  // 3. 현재 체크리스트 상태를 로컬 스토리지에 저장하는 함수
  function saveTodos() {
    const todos = [];
    // todoList 내의 모든 li 항목 순회
    todoList.querySelectorAll('li').forEach((item) => {
      const text = item.querySelector('.todo-item-text').textContent;
      const completed = item.querySelector('input[type="checkbox"]').checked;
      todos.push({ text, completed });
    });
    // JSON 문자열로 변환하여 로컬 스토리지에 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  // 4. 새로운 항목을 추가하고 저장하는 함수
  function handleAddTodo() {
    const text = todoInput.value.trim();
    if (text === '') return; // 입력값이 없으면 무시

    addTodoToDOM(text); // 화면에 추가
    saveTodos(); // 저장

    todoInput.value = ''; // 입력 필드 초기화
    todoInput.focus(); // 입력 필드에 다시 포커스
  }

  // 이벤트 리스너
  addButton.addEventListener('click', handleAddTodo);

  // 엔터 키 입력으로도 항목 추가 가능하게 설정
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  });

  // 페이지 로드 시 기존 데이터 불러오기
  loadTodos();
});
