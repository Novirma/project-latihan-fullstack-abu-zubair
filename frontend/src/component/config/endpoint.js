import axios from "axios"
import { json } from "react-router-dom"

export default axios.create({
    baseURL:"http://localhost:5000"
    // headers: {
    //     "Content-Type: "application/json"
    // }
})