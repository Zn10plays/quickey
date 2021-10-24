import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import url from './loser1.png'
import Cookies from 'js-cookie'
import Login from './login'
import './blocked.css'
import { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';
import List from '../list/List'
import AddBlock from '../addblocks/Add'

const Auth = ({login}) => {

  if (login) {
    return ( <> <Redirect to="/list" /> </>)
  }

  return (
    <>
      <Image src={url} className="unauth" />
      <h1 className="warning"> Unauthorised Activity </h1>
      <br />
      <Link to="/login">
        <Button varient="flat" size="lg"> Login </Button>
      </Link>
    </>
  )
}

class Blocker extends Component {
  constructor (props) {
    super(props)
    this.state = {validity: false}
  }

  async componentDidMount () {
    const token = Cookies.get('token');
    if (!token) return
    const responce = await axios({method: 'POST', url: '/o/confirm', data: {token}})
    if (responce.data.userHasAccess) {
      this.setState({validity: true})
    } else {
      Cookies.remove('token');
    }
  }

  render () {
    return ( 
      <>
        <Router>
         {
           this.state.validity && (() => {
             return <Redirect to='/list'/>
           }) ()
         }
         {
           !this.state.validity && (() => {
             return <Redirect to='/'/>
           }) ()
         }
          <Switch>
            <Route exact path="/">
              <Auth login={this.state.validity} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/list">
              <List run={true}/>
            </Route>
            <Route path="/add">
              <AddBlock />
            </Route>
        </Switch>
      </ Router>
    </>
    )
  }
}

export default Blocker