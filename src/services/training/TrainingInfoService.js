import axios from "axios";

export default {
    sendGetTrainingInfoRequest(sportId = null) {
        const url = sportId ? `/training-info?sportId=${sportId}` : '/training-info';
        return axios.get(url);
    },
    
    sendGetTrainingRequest(trainingId){

         return  axios.get('/training', {
                    params: {
                        trainingId: trainingId,
                    }
                }
            )
    },
    sendTrainingPutRequest(trainingId,training) {
       return axios.put('/training-info', training, {
                params: {
                    trainingId: trainingId,

                }
            }
        )
    },
    removeTraining(trainingId) {
        return axios.delete('/training-info', {
                params: {
                    trainingId: trainingId,
                }
            }
        )
    },
}
