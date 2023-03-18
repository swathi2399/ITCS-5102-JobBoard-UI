import api from './api/users';
import './App.css';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';




function App() {
  
  const addUser = async(user) => {
    const request = {
      ...user,
    };
    const response = await api.post("/users",request)
    console.log(response.data);
    

  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/">
            <Registration addUser = {addUser} />
          </Route>
          <Route exact path ="/login">
            <Login/>
          </Route>
        </Switch>

    

      
      </Router>
    </div>
  );
}

export default App;
