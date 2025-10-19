import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

type DiaryEntry = {
  date: string; // Store date as 'PPP' string for easy keying
  content: string;
};

const Diary = () => {
  const [kavithai, setKavithai] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [currentThought, setCurrentThought] = useState("");

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, "PPP");
      const existingEntry = entries.find((entry) => entry.date === dateString);
      setCurrentThought(existingEntry ? existingEntry.content : "");
    } else {
      setCurrentThought("");
    }
  };

  const handleSaveKavithai = () => {
    if (!kavithai.trim()) {
      showError("Kavithai cannot be empty.");
      return;
    }
    showSuccess("Kavithai saved successfully!");
    // In a real app, you would save this to a backend.
  };

  const handleSaveThought = () => {
    if (!selectedDate) {
      showError("Please select a date.");
      return;
    }
    if (!currentThought.trim()) {
      showError("Thought cannot be empty.");
      return;
    }

    const dateString = format(selectedDate, "PPP");
    const entryIndex = entries.findIndex((entry) => entry.date === dateString);

    let updatedEntries;
    if (entryIndex > -1) {
      // Update existing entry
      updatedEntries = [...entries];
      updatedEntries[entryIndex] = { date: dateString, content: currentThought };
    } else {
      // Add new entry
      updatedEntries = [
        ...entries,
        { date: dateString, content: currentThought },
      ];
    }

    // Sort entries by date (most recent first)
    updatedEntries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setEntries(updatedEntries);
    showSuccess(`Thought for ${dateString} saved!`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Diary</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>கவிதை (Kavithai)</CardTitle>
            <CardDescription>Write a beautiful poem for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start writing your kavithai here..."
              rows={10}
              value={kavithai}
              onChange={(e) => setKavithai(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveKavithai}>Save Kavithai</Button>
          </CardFooter>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Thoughts</CardTitle>
              <CardDescription>
                Select a date and jot down your thoughts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </div>
              <Textarea
                placeholder={
                  selectedDate
                    ? `What's on your mind for ${format(selectedDate, "PPP")}?`
                    : "Select a date to start writing."
                }
                rows={6}
                value={currentThought}
                onChange={(e) => setCurrentThought(e.target.value)}
                disabled={!selectedDate}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveThought} disabled={!selectedDate}>
                Save Thought
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thought History</CardTitle>
          <CardDescription>Review your past entries.</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {entries.map((entry) => (
                <AccordionItem value={entry.date} key={entry.date}>
                  <AccordionTrigger>{entry.date}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-wrap">
                    {entry.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No thoughts saved yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Diary;