import axios from "axios";

export default{
    sendPostCoachSportRequest(userId, sportId) {
            return axios.post('coach-sport', null, {
                    params: {
                        userId: userId,
                        sportId: sportId,
                    }
                })
        }
    }