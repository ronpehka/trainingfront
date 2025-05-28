import axios from "axios";

export default {
    sendPostCustomerTrainingRegistrationRequest(userId, trainingId) {
        return axios.post("/customer-training-register", null, {
            params: {userId, trainingId}
        });
    },
    sendPostCustomerTrainingUnregistrationRequest(userId, trainingId) {
        return axios.delete("/customer-training-register", {
            params: {userId, trainingId}
        });
    }
};