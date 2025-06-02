import axios from "axios";

export default {
    sendGetSportsRequest() {
       return axios.get('/sports')

    },


}