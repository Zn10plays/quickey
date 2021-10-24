import axios from "axios";
import Cookies from "js-cookie";

const messageApi = async ({url, body = {}, method}) => {
  const token = Cookies.get('token')
  const data = body;
  data.token = token;
  return  axios({url, data, method});
}

export default messageApi