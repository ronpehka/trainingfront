import axios from "axios";

export default {
    sendPostTrainingLocationRequest(selectedTrainingId, selectedLocationId) {
        return axios.post('training-location', null, {
                params: {
                    trainingId: selectedTrainingId,
                    locationId: selectedLocationId
                }
            }
        )
    }

}