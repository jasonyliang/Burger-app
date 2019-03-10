import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-project-f4954.firebaseio.com/"
});

export default instance;
