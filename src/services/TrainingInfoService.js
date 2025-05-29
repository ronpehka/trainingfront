import axios from "axios";

export default {
    sendGetTrainingInfoRequest(sportId = null) {
        const url = sportId !== null ? `/training-info?sportId=${sportId}` : '/training-info';
        return axios.get(url);
    }
}
