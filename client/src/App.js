import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import './App.css';
import Landing from './components/Landing';
import DogDetails from "./components/DogDetails/DogDetails";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const dogs = useSelector((state) => state.dogs);

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
      </Switch>
    </div>
  );
}

export default App;



/*
<DogDetails 
                    dog={dogs.filter((d) => d.id == match.params.dogId)}/>
                    */