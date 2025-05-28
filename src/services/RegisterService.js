import axios from "axios";

export default {
    sendPostCustomerTrainingRegistrationRequest(userId, trainingId) {
        return axios.post("/customer-training-register", null, {
            params: {userId, trainingId}
        });
    }
};