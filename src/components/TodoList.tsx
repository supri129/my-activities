import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: Date;
};

type TodoListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskItem = ({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <li className="flex items-center gap-3 rounded-md p-2 bg-gray-50 dark:bg-gray-800">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
      />
      <div className="flex-1">
        <label
          htmlFor={`task-${task.id}`}
          className={`text-sm ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </label>
        {task.dueDate && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Due: {format(task.dueDate, "PPP")}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-8 w-8"
      >
        <X size={16} />
      </Button>
    </li>
  );
};

export const TodoList = ({ tasks, setTasks }: TodoListProps) => {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      showError("Task cannot be empty.");
      return;
    }
    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      dueDate: dueDate,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
    setDueDate(undefined);
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

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const tasksWithDueDate = tasks
    .filter((task) => task.dueDate)
    .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime());

  const renderTaskList = (taskList: Task[]) => (
    <ul className="space-y-2 mt-4">
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 pt-4">
          No tasks here.
        </p>
      )}
    </ul>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Add a new task..."
          className="flex-grow"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleAddTask} className="w-full sm:w-auto">
          Add Task
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="due-dates">Due Dates</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderTaskList(tasks)}</TabsContent>
        <TabsContent value="pending">{renderTaskList(pendingTasks)}</TabsContent>
        <TabsContent value="completed">
          {renderTaskList(completedTasks)}
        </TabsContent>
        <TabsContent value="due-dates">
          {renderTaskList(tasksWithDueDate)}
        </TabsContent>
      </Tabs>
    </div>
  );
};