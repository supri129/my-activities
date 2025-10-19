import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Database, HelpCircle, ThumbsUp } from "lucide-react";

const Settings = () => {
  const settingsItems = [
    { icon: <User className="h-5 w-5" />, text: "Profile" },
    { icon: <Database className="h-5 w-5" />, text: "Data Management" },
    { icon: <HelpCircle className="h-5 w-5" />, text: "Help & Support" },
    { icon: <ThumbsUp className="h-5 w-5" />, text: "Like the App" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {settingsItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;