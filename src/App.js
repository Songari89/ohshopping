import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Header />
          <Outlet />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
