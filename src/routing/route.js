import React, { Component } from 'react';
import {Route, Redirect,Switch} from 'react-router-dom';
import Home from '../components/home/home';
import Artist from '../components/artist/artist';
import Album from '../components/album/album';
import Cart from '../components/cart/cart';
import Admin from '../components/admin/admin';
import Register from '../components/register/register'
import Login from '../components/login/login'

class MyRouting extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/artist/:id' component={Artist} />
                <Route exact path='/album' component={Album} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route path='/*'>
                    <Redirect to='/login'/>
                </Route>
            </Switch>
        );
    }
}

export default MyRouting;