import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const TodoList = ({ tasks, setTasks }: TodoListProps) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      showError("Task cannot be empty.");
      return;
    }
    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
    showSuccess("Task added successfully!");
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showSuccess("Task removed.");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Add a new task..."
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 rounded-md p-2 bg-gray-50 dark:bg-gray-800"
          >
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => handleToggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-1 text-sm ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTask(task.id)}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};