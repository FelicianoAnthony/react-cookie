import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";

import React from "react";
import AuthApi from "./AuthApi"

import Cookies from 'js-cookie';

function App() {

  const readCookie = () => {
    const user = Cookies.get('user'); 
    if (user) {
      setAuth(true)
    }
  }

  React.useEffect(() => {
    readCookie();
  })

  const [auth, setAuth] = React.useState(false);
  return (
    <div className="App">
      
      <AuthApi.Provider value={{auth, setAuth}}>
        <Router> 
          <Routes/>  
        </Router>
      </AuthApi.Provider>
    </div>
  );
}


const Login = () => {


  const Auth = React.useContext(AuthApi)

  const handleOnClick = () => {
    Auth.setAuth(true)
    Cookies.set('user', 'loginTrue')
  }


  return (
    <div>
      <h1> welcome to website </h1> 
      <button onClick={handleOnClick}> Login </button>
    </div>
  )
}

const Dashboard = () => {

  const Auth = React.useContext(AuthApi)

  const handleOnClick = () => {
    Auth.setAuth(false)
    Cookies.remove('user')
  }

  return (
    <div> 
      <h1> Dashboard </h1>
    <button onClick={handleOnClick}> Logout </button>
    </div>
  )
}

const Routes = () => {

  const Auth = React.useContext(AuthApi)

  return (
    <Switch>
      <ProtectedLogin path='/login' component={Login} auth={Auth.auth}/>
      <ProtectedRoute path='/dashboard' auth={Auth.auth} component={Dashboard}/>
    </Switch>
  )
}


const ProtectedRoute = ({auth, component: Component,...rest}) => {

  console.log(`auth protected route ${JSON.stringify(auth)}`)
  return  (
  <Route
    {...rest}
    render= {() => auth ?(
      <Component/>
    ) :
      (
        <Redirect to='/login'/>
      )
  
    }
  />
  )
}


const ProtectedLogin = ({auth, component: Component,...rest}) => {

  console.log(`auth protected route ${JSON.stringify(auth)}`)
  return  (
  <Route
    {...rest}
    render= {() => !auth ?(
      <Component/>
    ) :
      (
        <Redirect to='/dashboard'/>
      )
  
    }
  />
  )
}

export default App;
