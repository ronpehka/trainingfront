import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import TrainingInfoView from "@/views/TrainingInfoView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import LocationView from "@/views/LocationView.vue";
import CoachRegistrationView from "@/views/CoachRegistrationView.vue";
import CoachInfoView from "@/views/CoachInfoView.vue";
import AddNewTrainingView from "@/views/AddNewTrainingView.vue";
import ErrorView from "@/views/ErrorView.vue";
import TrainingLocation from "@/views/TrainingLocationView.vue";
import TrainingLocationView from "@/views/TrainingLocationView.vue";
import CustomerTrainingRegisterView from "@/views/CustomerTrainingRegisterView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/training-info',
    name: 'trainingInfoRoute',
    component: TrainingInfoView
  },
  {
    path: '/customer-registration',
    name: 'registrationRoute',
    component: RegistrationView
  },
  {
    path: '/locations',
    name: 'locationsRoute',
    component: LocationView
  },
  {
    path: '/coach-registration',
    name: 'coachRegistrationRoute',
    component: CoachRegistrationView
  },
  {
    path: '/new-training',
    name: 'addNewTrainingRoute',
    component: AddNewTrainingView
  },
  {
    path: '/customer-training-register',
    name: 'customerTrainingRegisterRoute',
    component: CustomerTrainingRegisterView
  },
  {
    path: '/error-view',
    name: 'errorViewRoute',
    component: ErrorView
  },
  {
    path: '/coach-info',
    name: 'coachInfoRoute',
    component: CoachInfoView
  },
  {
    path: '/',
    name: 'coachInfoRoute',
    component: CoachInfoView
  },
  {
    path: '/training-location',
    name: 'trainingLocationRoute',
    component: TrainingLocationView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
