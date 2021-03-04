import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Nav from "./layouts/Nav";
import Report from "./pages/Report";

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
        <Route path="/report">
          <Nav />
          <Report />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/">
          <Nav />
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
