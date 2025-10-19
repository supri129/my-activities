import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Archive, History, Trash2 } from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

const Settings = () => {
  const handleLogout = () => {
    showError("Logout functionality is not implemented yet.");
  };

  const handleNotImplemented = (feature: string) => {
    showError(`${feature} is not implemented yet.`);
  };

  const handleClearAllTasks = () => {
    // In a real app, you would clear the tasks from state/storage here.
    showSuccess("All tasks have been cleared.");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSwitcher />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get push notifications on your devices.
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Update your security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button>Change Password</Button>
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your application data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="backup" className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5">
                  <TabsTrigger value="backup">Backup</TabsTrigger>
                  <TabsTrigger value="restore">Restore</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="clear">Clear All</TabsTrigger>
                </TabsList>
                <TabsContent value="backup" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a backup of all your tasks.
                  </p>
                  <Button onClick={() => handleNotImplemented("Backup")}>
                    <Archive className="mr-2 h-4 w-4" /> Backup Tasks
                  </Button>
                </TabsContent>
                <TabsContent value="restore" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Restore tasks from a backup file.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleNotImplemented("Restore")}
                  >
                    <History className="mr-2 h-4 w-4" /> Restore Tasks
                  </Button>
                </TabsContent>
                <TabsContent value="completed" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage all your completed tasks.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleNotImplemented("Clear Completed")}
                  >
                    Clear Completed Tasks
                  </Button>
                </TabsContent>
                <TabsContent value="pending" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    View all your pending tasks.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleNotImplemented("View Pending")}
                  >
                    View Pending Tasks
                  </Button>
                </TabsContent>
                <TabsContent value="clear" className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete all tasks. This action cannot be undone.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All Tasks
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete all your tasks.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAllTasks}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;