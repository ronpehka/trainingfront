import axios from "axios";

export default {
    sendGetSportsInfoRequest() {
        return axios.get('sports')
    },

}