import axios from "axios";

export default {

    sendGetCoachInfoRequest() {
        return axios.get('/coach-info');
    },
}