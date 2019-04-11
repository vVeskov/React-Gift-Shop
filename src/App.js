import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Home/Home';
import Register from './Register/Register';
import Header from './Header/Header';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';
import Order from './Order/user-order-menu';
import Edit from './Edit/Edit';
import UserOrders from './UserOrders/userOrders';
import Footer from './Footer/Footer';
import Details from './Details/Details';
import Cart from './Cart/Cart'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false,
      isLogged: false,
      gifts: [],
    }
  }

  componentWillMount() {
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin == "false") {
      isAdmin = false;
    } else {
      isAdmin = true;
    }
    let isUsername = sessionStorage.getItem('username')
    if (sessionStorage.getItem('username')) {
      this.setState({
        username: isUsername,
        isAdmin: isAdmin
      })
    }
    fetch('http://localhost:9999/feed/gifts', {
      method: 'GET'
    }).then(rawData => rawData.json())
      .then(body => {
        this.setState({
          gifts: body.gifts
        })

      }
      );
  }

  handleChange(event) {
    // console.log(event.target.name, '=>', event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleCreateSubmit(event, data) {
    event.preventDefault();
    if (!data.giftName || !data.description || !data.imageUrl || !data.price) {
      toast.success("Please enter all fields", {
        closeButton: false,
      })
    } else {
      fetch('http://localhost:9999/feed/gift/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', }

      }).then(rawData => rawData.json())
        .then(responseBody => {
          if (!responseBody.errors) {
            toast.success(responseBody.message, {
              closeButton: false,
            })
            setTimeout(function () { window.location.href = 'http://localhost:3000'; }, 1000);

          } else {
            toast.error(responseBody.message, {
              closeButton: false,
            })
          }
        })
    }
  }

  handleSubmit(event, data, isSignUp) {
    event.preventDefault();
    fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in')
      , {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', }

      }).then(rawData => rawData.json())
      .then(responseBody => {
        if (responseBody.username) {

          this.setState({
            username: responseBody.username,
            isAdmin: responseBody.isAdmin,
            isLogged: true
          });
          sessionStorage.setItem('username', responseBody.username);
          sessionStorage.setItem('isAdmin', responseBody.isAdmin);

          toast.success(`Welcome, ${responseBody.username}`, {
            closeButton: false,
          })

        } else {
          toast.error(responseBody.message, {
            closeButton: false,
          })
        }
      })
  }

  logout() {
    this.setState({
      username: null,
      isAdmin: false,
      isLogged: false,
    })
    toast.success('Logout successfull', {
      closeButton: true,
    })
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('username');
    // sessionStorage.removeItem('userId');
    // sessionStorage.removeItem('token');
  }

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <Header isAdmin={this.state.isAdmin} username={this.state.username}
          logout={this.logout.bind(this)} isLogged={this.state.isLogged} />
        <Switch>
          <Route exact render={
            (props) => <Home
              {...props}
              gifts={this.state.gifts} isAdmin={this.state.isAdmin}
            />}
            path="/" />

          <Route render={
            (props) => <Register
              {...props}
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange}
              isLogged={this.state.isLogged}
            />}
            path="/register" />

          <Route render={
            (props) => <UserOrders
              {...props}

            />}
            path="/orders/:userId" />

          <Route
            path='/login'
            render={
              (props) => <Login
                {...props}
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
                isLogged={this.state.isLogged}
              />}
          />

          <Route
            path='/create'
            render={
              () =>
                this.state.isAdmin ?
                  <Create
                    handleCreateSubmit={this.handleCreateSubmit.bind(this)}
                    handleChange={this.handleChange}
                  />
                  :
                  <Redirect
                    to={{
                      pathname: '/login'
                    }}
                  />
            }
          />
          <Route
            path='/order/:id'
            render={
              (props) =>
                this.state.username ?
                  <Order
                    {...props}

                    gifts={this.state.gifts}
                  />
                  :
                  <Redirect
                    to={{
                      pathname: '/login'
                    }}
                  />
            }
          />

          <Route
            path='/details/:id'
            render={
              (props) =>
                <Details
                  {...props}
                  gifts={this.state.gifts}
                />
            }
          />

          <Route
            path='/cart'
            render={
              (props) =>
                <Cart
                  {...props}
                />
            }
          />

          <Route
            path='/edit/:id'
            render={
              (props) => <Edit
                {...props}
                gifts={this.state.gifts}
                // handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
              />}
          />

          <Route render={() => <h1>Page was not found!</h1>} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
