import React, { useState, useEffect, useRef, JSX } from "react";
import Sortable from "sortablejs";
import "./TodoList.scss";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function SortableTodoList(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Học React", completed: false },
    { id: 2, text: "Làm bài tập", completed: false },
    { id: 3, text: "Đi chợ", completed: true },
    { id: 4, text: "Nấu ăn", completed: false },
    { id: 5, text: "Đọc sách", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState<string>("");
  const sortableRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);

  useEffect(() => {
    if (sortableRef.current) {
      sortableInstance.current = Sortable.create(sortableRef.current, {
        animation: 200,
        delay: 2,
        delayOnTouchOnly: true,
        handle: ".drag-handle",
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex !== undefined && newIndex !== undefined) {
            setTodos((prevTodos) => {
              const newTodos = [...prevTodos];
              const [removed] = newTodos.splice(oldIndex, 1);
              newTodos.splice(newIndex, 0, removed);
              return newTodos;
            });
          }
        },
      });
    }

    return () => {
      if (sortableInstance.current) {
        sortableInstance.current.destroy();
      }
    };
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newItem: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newItem]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">📝 Todo List</h1>

      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          onKeyPress={handleKeyPress}
          placeholder="Thêm công việc mới..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          ➕
        </button>
      </div>

      <div ref={sortableRef} className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            {/* Drag handle */}
            <span className="drag-handle">⋮⋮</span>

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="todo-checkbox"
            />

            {/* Todo text */}
            <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
              {todo.text}
            </span>

            {/* Delete button */}
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              🗑️
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <div className="empty-state">
          Chưa có công việc nào. Thêm một công việc mới nhé! 🎯
        </div>
      )}

      <div className="stats">
        Tổng: {todos.length} | Hoàn thành:{" "}
        {todos.filter((t) => t.completed).length} | Còn lại:{" "}
        {todos.filter((t) => !t.completed).length}
      </div>
    </div>
  );
}
