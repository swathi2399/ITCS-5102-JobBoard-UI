import api from './api/users';
import './App.css';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  
  
  return (
   
      <Router>
        <NavBar />
        <div className="App">
        <Switch>
          <Route exact path = "/">
            <Registration />
          </Route>
          <Route exact path ="/login">
            <Login/>
          </Route>
          <Route exact path ="/home">
            <Home/>
          </Route>
        </Switch>

    
        </div>
      </Router>
    
  );
}

export default App;
