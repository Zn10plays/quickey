import './List.css'
import Table from './table.js'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { Component } from 'react';
import { Redirect } from 'react-router';
import getData from '../api/api.js'
import axios from 'axios';

class List extends Component {
  constructor (props) {
    super(props); 
    this.state = { tokenValid: true, items: [], shouldrun: props.run, red: false, buttonDisAbbel: true}
    this.tabel = new Table();
    this.select = this.select.bind(this);
    this.remove = this.remove.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    if (!this.state.shouldrun) return
    const data = await getData();
    this.setState({items:data})
  }

  select(e) {
    const motherELM = e.target.closest('.box')
    console.log(motherELM.classList.toggle('selected'))
    this.tabel.toggle(motherELM.id)
    console.log(this.tabel.list)
    this.setState({buttonDisAbbel: this.tabel.list.length === 0 ? true : false})
  }

  async remove (e) {
    const token = Cookies.get('token')
    this.tabel.list.forEach(async id => {
      document.getElementById(id).remove();
      try {
        const responce = await axios({method: 'POST', url:"/m/remove", data: { listItemId: id, token }});
        console.log(responce.data)
      } catch(e) {} 
    })
    this.tabel.wipe();
  }

  logout () {
    Cookies.remove('token');
    this.setState({tokenValid: false, red: true});
  }


  render () {
    return (
    <>
      {this.state.red && (() => {if (!this.state.tokenValid) return (<Redirect to="/"/>); else return (<Redirect to="/add"/>)}) ()}
      <div className="list" > 
        {this.state.items && this.state.items.map(e => {
            return (
              <Card id={e._id} className="box">
                <Card.Header as="h4" onClick={this.select}>{e.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{e.url}</Card.Title>
                  { e.img && 
                    <Card.Img src={e.img} />
                  }
                  <Card.Text> 
                    {e.des}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
      </div>

      <div className="options">
        <Button variant="primary" size="lg" onClick={e => {this.setState({red: true})}}> Add Items </Button>{' '}
        <Button variant="secondary" size="lg" onClick={this.remove} disabled={this.state.buttonDisAbbel}> Remove Items </Button>{' '}
        <Button variant="danger" size="sm" onClick={this.logout}> Logout </Button>{' '}
      </div>
    </>
    )
  }
}


export default List;
