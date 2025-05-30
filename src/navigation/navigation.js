import router from "@/router";

export default {

    navigateToTrainingInfoView() {
        router.push({name: 'trainingInfoRoute'})
    },
    navigateToRegistrationView() {
        router.push({name: 'registrationRoute'})
    },
    navigateToCoachRegistrationView() {
        router.push({name: 'coachRegistrationRoute'})
    },
    navigateToErrorView() {
        router.push(({name: 'errorViewRoute'}))
    },
    navigateToCoachView() {
        router.push({name: 'coachRoute'})
    },
    navigateToAddNewTrainingView() {
        router.push({name: 'addNewTrainingRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },
    navigateToTrainingLocationView(trainingId) {
        router.push({
            name: 'trainingLocationRoute',
            query: { trainingId }
        })
    },
    navigateToEditView(trainingId) {
        router.push({
            name: 'addNewTrainingRoute',
            query:{ trainingId }
        })

    },
}