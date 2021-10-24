import { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router";

class AddBlock extends Component {
  constructor(props) {
    super(props)
    this.state = { sendBack: false, title:'', des:'', link: '' }
    this.submit = this.submit.bind(this);
  }


  async submit (event) {
    event.preventDefault();
    console.log(this.state);
    const token = Cookies.get('token');
    const { title, des, link } = this.state;
    const data = {token, payload: {title, des, url: link}}
    const responce = await axios({method:'POST', url:'/m/add', data})
    this.setState({sendBack: true})
  }

  render () {

    return(
      <>
        {this.state.sendBack && (() => {return <Redirect to="/"/>}) ()}
        <div className="appBorder">
          <Form className="form-outer-body" onSubmit={e => this.submit(e)}>
            <Form.Group>
              <Form.Label>Enter A Title</Form.Label>
              <Form.Control placeholde="Title" onChange={e => {this.setState({title: e.target.value}) }}/>
            </Form.Group>          
              
            <Form.Group>
              <Form.Label>Enter a short description</Form.Label>
              <Form.Control placeholde="What is this about?" onChange={e => {this.setState({des: e.target.value}) }} />
            </Form.Group>          
              
            <Form.Group>
              <Form.Label>Enter a Link</Form.Label>
              <Form.Control placeholde="https://google.com/" onChange={e => {this.setState({link: e.target.value}) }}/>
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-form" style={{marginTop: '3%'}}>
              Create a New Item
            </Button>
          </Form>
        </div>
      </>
    )
  }
}

export default AddBlock;