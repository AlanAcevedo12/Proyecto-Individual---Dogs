import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './components/Landing';
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Switch>
          <Route exact path="/"><Landing /></Route>
          <Route path="/home"><Home /></Route>
          <Route path="/detail/:dogId"><Detail /></Route>
          <Route path="/create"><Create /></Route>
      </Switch>
    </div>
  );
}

export default App;
