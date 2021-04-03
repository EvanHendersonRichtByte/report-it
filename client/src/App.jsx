import { BrowserRouter, Route, Switch } from "react-router-dom";

// User
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Report from "./pages/Report";
import ReportHistory from "./pages/ReportHistory";

// Employee
import Dashboard from "./layouts/Dashboard";
import Employee from "./pages/Employee";
import AssignedEmployee from "./pages/AssignedEmployee";
import EmployeeReportHistory from "./pages/EmployeeReportHistory";
const isLogged = () => {
  let token = sessionStorage.getItem("auth-token");
  if (token) {
    token = JSON.parse(token).data;
    console.log("there is");
  }
};
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {isLogged()}
        <Route exact path="/" component={Index} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <Dashboard>
          <Route path="/report/history" component={ReportHistory} />
          <Route exact path="/report" component={Report} />
          <Route path="/employee/history" component={EmployeeReportHistory} />
          <Route path="/employee/assigned" component={AssignedEmployee} />
          <Route exact path="/employee" component={Employee} />
        </Dashboard>
      </Switch>
    </BrowserRouter>
  );
}
