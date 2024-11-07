import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
}

export function TodoItem({
  todo,
  toggleComplete,
  editTodo,
  deleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border-2 border-gray-200 rounded mt-2">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-grow border-2 rounded p-1 mr-2"
        />
      ) : (
        <span
          className={`flex-grow ${
            todo.completed ? "line-through text-red-300" : ""
          }`}
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-teal-500 text-white px-2 rounded"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 text-white px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => toggleComplete(todo.id)}
              className={`px-2 rounded ${
                todo.completed ? "bg-gray-400" : "bg-blue-500"
              } text-white`}
            >
              {todo.completed ? "Undo" : "Mark as Done"}
            </button>
          </>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
