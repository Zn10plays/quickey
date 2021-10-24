import axios from 'axios';
import Cookies from 'js-cookie';

function dummyClient () {
  return new Promise(res => {
    setTimeout(() => {
      res([
        {title: "This is the title", description: 'hello how are you doing', link:'https://gooogle.com/', img:'', _id:'69420'},
        {title: "This is the title1", description: 'hello how are you doing1', specificLink:'https://gooogle.com/', img:'', _id:'xxxtustaron'},
        {title: "This is the title2", description: 'hello how are you doing2', specificLink:'https://gooogle.com/', img:'', _id:'329012'}
      ])
    }, 1000)
  })
}

async function getData () {
  const token = Cookies.get('token');
  if (!token) return;
  const responce = await axios({method: 'POST', url: '/m/list', data:{token}})
  return responce.data
}

export default getData;
export { dummyClient };
