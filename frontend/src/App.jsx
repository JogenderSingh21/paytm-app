import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./components/SendMoney";
import { RootPage } from "./pages/RootPage";
import { Successful } from "./components/Successful";
import { NotFound } from "./components/NotFound";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/successfull" element={<Successful isSuccess={true} />} />
          <Route path="/failed" element={<Successful isSuccess={false} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
