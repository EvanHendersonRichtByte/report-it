import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
