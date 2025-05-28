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
    navigateToErrorView() {
        router.push(({name: 'errorViewRoute'}))
    },
    navigateToCoachView() {
        router.push({name:'coachRoute'})
    },
    navigateToAddNewTrainingView(){
        router.push({name:'addNewTrainingRoute'})
    },
    navigateToHomeView(){
      router.push({name: 'homeRoute'})
    }

}