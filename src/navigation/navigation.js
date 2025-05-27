import router from "@/router";

export default {

    navigatetoTrainingInfo() {
        router.push({name:'trainingInfoRoute'})
    },
    navigateToRegistrationView() {
        router.push({name:'registrationRoute'})
    },
    navigateToCoachRegistrationView() {
        router.push({name:'coachRegistrationRoute'})
    },
    navigateToCoachView() {
        router.push({name:'coachRoute'})
    },

}