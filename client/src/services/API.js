import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: 'https://server.sanjay94.now.sh/' // the url of our server
  });
};
