const app = new Vue({
  el: "#app",
  data: {
    todos: JSON.parse(localStorage.getItem("todos")) || [
      {
        id: generateId(),
        description: "Bath in the glory of this app",
        done: false,
      },
    ],
    newTodo: "",
    filter: "all",
  },
  methods: {
    handleAddTodo() {
      const description = this.newTodo.trim();

      if (description === "") {
        return;
      }

      if (this.isDuplicate(description)) {
        alert("Todo already exists!");
        return;
      }

      const newTodo = {
        description,
        done: false,
      };

      fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((data) => {
          this.todos.push(data);
          this.updateTodosAndSave();
          this.newTodo = ""; // Clear the input field after adding a new todo
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    },

    handleRemoveDoneTodos() {
      const doneTodos = this.todos.filter((todo) => todo.done);
      const deletePromises = doneTodos.map((todo) =>
        fetch(`http://localhost:4730/todos/${todo.id}`, {
          method: "DELETE",
        })
      );

      Promise.all(deletePromises)
        .then(() => {
          this.todos = this.todos.filter((todo) => !todo.done);
          this.updateTodosAndSave();
        })
        .catch((error) => {
          console.error("Error removing done todos:", error);
        });
    },

    updateTodoStatus(todo) {
      fetch(`http://localhost:4730/todos${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: todo.done }),
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error updating todo status:", response.status);
          }
          this.saveTodosToLocalStorage();
        })
        .catch((error) => {
          console.error("Error updating todo status:", error);
        });
    },

    updateTodosAndSave() {
      this.renderTodoList();
      this.saveTodosToLocalStorage();
    },

    renderTodoList() {
      this.todoList.innerHTML = "";
      this.filteredTodos.forEach((todo) => {
        const todoItem = this.createTodoItemElement(todo);
        this.todoList.appendChild(todoItem);
      });
    },

    createTodoItemElement(todo) {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");

      const todoCheckbox = document.createElement("input");
      todoCheckbox.type = "checkbox";
      todoCheckbox.checked = todo.done;
      todoCheckbox.addEventListener("change", () => {
        todo.done = !todo.done;
        this.updateTodoStatus(todo);
      });

      const todoLabel = document.createElement("label");
      todoLabel.textContent = todo.description;

      todoItem.appendChild(todoCheckbox);
      todoItem.appendChild(todoLabel);

      return todoItem;
    },

    fetchTodos() {
      fetch("http://localhost:4730/todos")
        .then((response) => response.json())
        .then((data) => {
          this.todos = data;
          this.renderTodoList();
        })
        .catch((error) => {
          console.error("Error fetching todos:", error);
        });
    },

    saveTodosToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    getSelectedFilter() {
      const selectedRadio = Array.from(this.filterRadios).find(
        (radio) => radio.checked
      );
      return selectedRadio ? selectedRadio.value : "all";
    },

    filterTodos(todos, filter) {
      switch (filter) {
        case "all":
          return todos;
        case "open":
          return todos.filter((todo) => !todo.done);
        case "done":
          return todos.filter((todo) => todo.done);
        default:
          return todos;
      }
    },

    isDuplicate(description) {
      return this.todos.some(
        (todo) => todo.description.toLowerCase() === description.toLowerCase()
      );
    },
  },
  computed: {
    filteredTodos() {
      return this.filterTodos(this.todos, this.filter);
    },
  },
  mounted() {
    this.fetchTodos();
  },
});
