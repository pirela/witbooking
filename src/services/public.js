import axios from "axios";

const pathApi = "http://localhost:4000/";

export function getAllData() {
  return axios.get(`${pathApi}`).then((res) => {
    return res;
  });
}
