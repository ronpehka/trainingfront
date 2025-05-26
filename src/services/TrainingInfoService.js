import axios from "axios";

export default{
    sendGetTrainingInfoRequest() {
        return axios.get('training-info')
    },
}