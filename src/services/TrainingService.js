import axios from "axios";

export default {
    sendPostTrainingRequest(addNewTraining) {
       return axios.post('/new-training', addNewTraining)
    },
}