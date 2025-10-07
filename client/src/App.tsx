import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { demoQueryClient } from "./lib/demoQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { DemoAuthProvider } from "@/contexts/DemoAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Sessions from "@/pages/Sessions";
import Exercises from "@/pages/Exercises";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

const IS_DEMO_MODE = false;

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/sessions" component={Sessions} />
      <Route path="/exercises" component={Exercises} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin">
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const client = IS_DEMO_MODE ? demoQueryClient : queryClient;
  const Provider = IS_DEMO_MODE ? DemoAuthProvider : AuthProvider;

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        <Provider>
          <Toaster />
          <Router />
        </Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
