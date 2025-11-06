import { LogOut, User, Mail, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface DashboardProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your account today.</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Full Name</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{user.name}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Email Address</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl break-all">{user.email}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Member Since</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">Nov 2024</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
            <CardDescription>
              Your account is active and ready to use. This is a demo dashboard to show successful authentication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="mb-2">🎉 Account Created Successfully</h3>
                <p className="text-sm text-muted-foreground">
                  Your account has been created and you're now logged in. In a real application, this would connect to your Express.js backend API and MongoDB database.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">Backend Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Express.js API endpoints ready for authentication, user management, and data storage.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="mb-2">MongoDB Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    User data securely stored in MongoDB with encrypted passwords and session management.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
