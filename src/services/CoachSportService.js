import axios from "axios";

export default{
    sendPostCoachSportRequest(coachSportPayload) {
            return axios.post('coach-sport', coachSportPayload)
        }
    }