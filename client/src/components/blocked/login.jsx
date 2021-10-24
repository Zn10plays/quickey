import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Component, createRef } from "react";
import Cookies from 'js-cookie'
import axios from 'axios';

class Login extends Component {

  constructor (props) {
    super(props)

    this.usernameSpace = createRef();
    this.passwordSpace = createRef();
    this.state = { correctPassword: true }
    this.submit = this.submit.bind(this);
    this.redirect = createRef()
  }

  async submit (event) {
    event.preventDefault()
    const [username, password] = [this.usernameSpace.current.value, this.passwordSpace.current.value]
    console.log(username, password)

    if (username && password) {
      try { 
        const responce = await axios({method:'POST', url:'/o/auth', data: {username, password}});
        const data = responce.data;
        Cookies.set('token', data.token);
        console.log(data)
        this.redirect.current.click();
      } 
      catch {
        console.log('incorrect password')
        this.setState({correctPassword: false})
      }
    }
  }

  render () {
    let validity = true;
    if (this.state.correctPassword) {
      validity = true
      console.log('cookie invalid')
    } else {
      validity = false
      console.log('valid')
    }

    return (
      <div className="appBorder">
        <Form className="form-outer-body" onSubmit={this.submit} autoComplete="off">
          <h1> Login </h1>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="input" placeholder="Enter Username" size="lg" ref={this.usernameSpace} required isInvalid={!validity} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" size="lg" ref={this.passwordSpace} required isInvalid={!validity} />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-form">
            LogIn
          </Button>
        </Form>
        <div style={{display:'none'}} >
          <a href="/" ref={this.redirect}>hello</a>
        </div>
      </div>
    )
  }
}

export default Login