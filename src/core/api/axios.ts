import axios from "axios";

const chessApi = axios.create({
  baseURL: "https://api.chess.com/pub/",
});

export default chessApi;
