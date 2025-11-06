import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { ForgotPasswordModal } from "./components/ForgotPasswordModal";
import { Dashboard } from "./components/Dashboard";
import { Toaster, toast } from "sonner@2.0.3";
import { Lock, Mail, User, CheckCircle2 } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sign In form state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up form state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  // Mock user database (in real app, this would be MongoDB via Express API)
  const [users, setUsers] = useState<UserData[]>([
    { name: "Demo User", email: "demo@example.com", password: "demo123" }
  ]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if user exists (mock authentication)
    const user = users.find(
      (u) => u.email === signInEmail && u.password === signInPassword
    );

    if (user) {
      setCurrentUser({ name: user.name, email: user.email });
      setIsLoggedIn(true);
      toast.success(`Welcome back, ${user.name}!`);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (signUpPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Check if user already exists
    if (users.find((u) => u.email === signUpEmail)) {
      toast.error("An account with this email already exists");
      return;
    }

    // Create new user (in real app, this would be saved to MongoDB)
    const newUser: UserData = {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    };

    setUsers([...users, newUser]);
    setCurrentUser({ name: newUser.name, email: newUser.email });
    setIsLoggedIn(true);
    toast.success("Account created successfully! Welcome aboard!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSignInEmail("");
    setSignInPassword("");
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpConfirmPassword("");
    setRememberMe(false);
    toast.success("Logged out successfully");
  };

  if (isLoggedIn && currentUser) {
    return (
      <>
        <Dashboard user={currentUser} onLogout={handleLogout} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Welcome to CAMPUSVERSE</h1>
            <p className="text-muted-foreground">Sign in to your account or create a new one</p>
          </div>

          {/* Auth Card */}
          <Card className="shadow-2xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-2xl">Account Access</CardTitle>
              <CardDescription className="text-center">
                Secure authentication for your web app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Sign In Tab */}
                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm cursor-pointer select-none"
                        >
                          Remember me
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(true)}
                        className="text-sm hover:underline"
                        style={{ color: 'var(--color-auth-blue)' }}
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: 'var(--color-auth-blue)' }}
                    >
                      Sign In
                    </Button>
                  </form>

                  <div className="text-center text-sm mt-4">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <button
                      onClick={() => setActiveTab("signup")}
                      className="hover:underline"
                      style={{ color: 'var(--color-auth-blue)' }}
                    >
                      Create one
                    </button>
                  </div>

                  <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-center text-muted-foreground">
                      Demo credentials: <span className="text-foreground">demo@example.com</span> / <span className="text-foreground">demo123</span>
                    </p>
                  </div>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <CheckCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: 'var(--color-auth-blue)' }}
                    >
                      Create Account
                    </Button>
                  </form>

                  <div className="text-center text-sm mt-4">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <button
                      onClick={() => setActiveTab("signin")}
                      className="hover:underline"
                      style={{ color: 'var(--color-auth-blue)' }}
                    >
                      Sign in
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Built with React.js + Express.js + MongoDB</p>
            <p className="mt-1">Secured with modern authentication practices</p>
          </div>
        </div>
      </div>

      <ForgotPasswordModal open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen} />
      <Toaster position="top-right" richColors />
    </>
  );
}
