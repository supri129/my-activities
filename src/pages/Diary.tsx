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
import { showSuccess } from "@/utils/toast";

const Diary = () => {
  const handleSave = (type: string) => {
    showSuccess(`${type} saved successfully!`);
    // In a real app, you would save the content to state or a backend.
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
            />
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("Kavithai")}>
              Save Kavithai
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Thoughts</CardTitle>
            <CardDescription>
              Jot down your thoughts for the day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="What's on your mind today?" rows={10} />
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("Daily Thought")}>
              Save Thought
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Diary;