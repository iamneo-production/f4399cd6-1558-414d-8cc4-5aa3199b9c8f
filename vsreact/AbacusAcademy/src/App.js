// import {BrowserRouter as  Route, Router, Routes} from 'react-router-dom'
import React from 'react'
// import { ReactDOM } from 'react-dom'

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'


import LoginForm from './Component/Loginpage/Login'
import Home from './Component/Home/Home'
import Signup from './Component/SignUpPage/Signup'
import NotFound from './Component/NotfoundPage/NotFound'
import viewInstitute from './AdminServices/Institute/viewInstitute'
import viewCourse from './AdminServices/Course/ViewCourse'
import AddInstitute from './AdminServices/Institute/AddInstitute'
import ViewCart from './AdminServices/Student/ViewCart'
import AddCourse from './AdminServices/Course/AddCourse'
import './App.css'

const App = () => (
     <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/institute" component={viewInstitute}/>
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/course/:id" component={viewCourse} />
            <Route exact path="/add/institute" component={AddInstitute}/>
            <Route exact path="/cart/:id" component={ViewCart}/>
            <Route exact path="/add/course/:id" component={AddCourse}/>
            <Redirect to="/not-found"/>
        </Switch>
    </BrowserRouter>
   
    
  
)

export default App
