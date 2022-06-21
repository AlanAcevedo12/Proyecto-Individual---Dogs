import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import './App.css';
import Landing from './components/Landing';
import DogDetails from "./components/DogDetails/DogDetails";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import About from "./components/About/About";
import Edit from "./components/Edit/Edit";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/"><Landing /></Route>
          <Route path="/home"><Home /></Route>
          <Route path="/detail/:dogId" 
                 render={({match}) => {
                   return (
                    <DogDetails id={match.params.dogId}/>
                   )
                 }}
          />
          <Route path="/create"><Create /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/edit/:dogId"
                 render={({match}) => {
                  return (
                    <Edit id={match.params.dogId}/>
                  )
                 }}
          />
      </Switch>
    </div>
  );
}

export default App;