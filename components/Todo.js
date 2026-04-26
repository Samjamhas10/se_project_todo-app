class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._selector = selector;
    this._templateElement = document.querySelector(selector);
    this._completed = data.completed;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoDeleteBtn.setAttribute(
      "aria-label",
      `Delete todo: ${this._data.name}`
    );

    this._todoDeleteBtn.addEventListener("click", () => {
      const ok = window.confirm("Delete this todo?");
      if (!ok) return;

      this._todoElement.remove();
      this._handleDelete(this._completed);
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._playCompletionAnimation();
      this._handleCheck(this._completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoCheckboxEl.checked = this._completed;
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _playCompletionAnimation = () => {
    if (this._completed) {
      this._todoElement.classList.add("todo_completed-animation");
      setTimeout(() => {
        this._todoElement.classList.remove("todo_completed-animation");
      }, 600);
    }
  };

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    const todoDate = document.createElement(`span`);

    this._todoDate.appendChild(todoDate);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this._todoDate.textContent = "";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
