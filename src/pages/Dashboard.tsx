import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { TodoList, Task } from "@/components/TodoList";
import { showSuccess, showError } from "@/utils/toast";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SpecialEvent = {
  date: Date;
  description: string;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      return parsed.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    }
    return [];
  });

  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(() => {
    const savedDates = localStorage.getItem("selectedDates");
    if (savedDates) {
      const parsed = JSON.parse(savedDates);
      return parsed.map((date: string) => new Date(date));
    }
    return [];
  });

  const [events, setEvents] = useState<SpecialEvent[]>(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      return parsed.map((event: SpecialEvent) => ({
        ...event,
        date: new Date(event.date),
      }));
    }
    return [];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | undefined>();
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
  }, [selectedDates]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (day: Date) => {
    const existingEvent = events.find(
      (event) => format(event.date, "PPP") === format(day, "PPP")
    );
    setDescription(existingEvent?.description || "");
    setCurrentDate(day);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!currentDate || !description.trim()) {
      showError("Please enter a description for the event.");
      return;
    }

    const dateString = format(currentDate, "PPP");
    const eventIndex = events.findIndex(
      (event) => format(event.date, "PPP") === dateString
    );

    let updatedEvents = [...events];
    if (eventIndex > -1) {
      updatedEvents[eventIndex] = { date: currentDate, description };
    } else {
      updatedEvents.push({ date: currentDate, description });
    }
    setEvents(updatedEvents.sort((a, b) => a.date.getTime() - b.date.getTime()));

    if (!selectedDates?.some((d) => format(d, "PPP") === dateString)) {
      setSelectedDates([...(selectedDates || []), currentDate]);
    }

    showSuccess(`Event for ${format(currentDate, "PPP")} saved!`);
    setIsDialogOpen(false);
    setDescription("");
    setCurrentDate(undefined);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setDescription("");
    setCurrentDate(undefined);
  };

  const eventDates = events.map((event) => event.date);

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoList tasks={tasks} setTasks={setTasks} />
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  Select dates and add notes for special events.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  onDayClick={handleDayClick}
                  modifiers={{ hasEvent: eventDates }}
                  modifiersClassNames={{
                    hasEvent: "underline",
                  }}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Special Events</CardTitle>
              </CardHeader>
              <CardContent>
                {events.length > 0 ? (
                  <ul className="space-y-2">
                    {events.map((event, index) => (
                      <li key={index} className="text-sm">
                        <strong>{format(event.date, "PPP")}:</strong>{" "}
                        {event.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click a date on the calendar to add an event.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What's special about this day?</DialogTitle>
            <DialogDescription>
              Add a note for {currentDate ? format(currentDate, "PPP") : ""}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Note
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Team meeting"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;