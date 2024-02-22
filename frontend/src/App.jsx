import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./components/SendMoney";
import { RootPage } from "./pages/RootPage";
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
        </Routes>
      </BrowserRouter>
      {/* <Signup></Signup> */}
      {/* <Signin></Signin> */}
    </>
  )
}

export default App
