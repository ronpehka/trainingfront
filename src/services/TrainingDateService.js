import axios from "axios";

export default {
    sendGetAllTrainingDatesRequest() {
        return axios.get("/training-dates")
    },
}