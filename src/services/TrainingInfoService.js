import axios from "axios";

export default {
    sendGetTrainingInfoRequest(sportId = null) {
        const url = sportId ? `/training-info?sportId=${sportId}` : '/training-info';
        return axios.get(url);
    },
}
