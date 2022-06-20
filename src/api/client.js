import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080/",
});

export default client;

export const profileImagePath = "http://localhost:8080/uploads/users/";
