import axios from 'axios';
//create an axios instance
const instance=axios.create({
  baseURL:'https://burger-react-project-2019.firebaseio.com/'
  //This is your URL where you want to send your request to to store your data in the database.
});

export default instance;