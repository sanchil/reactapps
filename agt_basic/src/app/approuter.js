import React,{useContext,useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './content/home';
import Wip from './content/wip';
import Contact from './content/contact';
import AboutMe from './content/about';
import Sell from './content/sell';
import Buy from './content/buy';
import Tools from './content/tools';
import Register from './content/admin/register';
import RegisterProperty from './content/admin/register/registerproperty';
//import CloudRegisterProperty from './content/admin/register/cloudregister';
import Login from './content/admin/login';
import UserProfile from './content/admin/userprofile';
import Terms from './content/terms';
import Privacy from './content/privacy';
import Test from './content/test';

import './components/styles/app.css';
import {useAppContext} from './lib/userhooks';
import _ from 'lodash';


const ProtectedRoute = ({children, ...rest})=>{

  const {appstate, dispatch} = useAppContext();

 // console.log("User logged in test: "+ !(_.isEmpty(appstate.user))&&appstate.user.login);

 return (
    <Route {...rest} 
        render={({location})=>(!(_.isEmpty(appstate.user))&&appstate.user.login)
        ?
        (children)
        :
        <Redirect to={{pathname:'/login',state:{from:location}}}/>} />)

}


const App = () => (
  <Switch>
    {/* 
    <Route exact path="/" component={Wip} />
    <Route exact path="/home" component={Home} /> 
    */}

    <Route exact path="/" component={Home} />      
    <Route exact path="/gauth" component={Home} />
    <Route exact path="/fbauth" component={Home} />
    <Route exact path="/amzauth" component={Home} />
    <Route exact path="/twauth" component={Home} />
   
  
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/about" component={AboutMe} />
    <Route exact path="/sell" component={Sell} />
    <Route exact path="/buy" component={Buy} />
    <Route exact path="/tools" component={Tools} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/registerproperty" component={RegisterProperty} />
    <Route exact path="/test" component={Test} />
    <Route exact path="/privacy" component={Privacy} />
    <Route exact path="/terms" component={Terms} />
  {/*   <Route exact path="/cloudregister" component={CloudRegisterProperty} /> */}
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/userprofile" >
      <UserProfile/>
      </ProtectedRoute>
    
  {/*   <Route exact path="/sess/:key/:val" component={Login} /> */}
  </Switch>
);

export default App;



