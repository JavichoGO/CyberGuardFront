import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Login.vue'
import gestorsUser from '@/pages/gestorsUsers.vue'
import registerUser from '@/pages/registerUsers.vue'
import registerQuestion from '@/pages/registerQuestions.vue'
import MasterPage from '@/pages/MasterPage.vue'
import metricsManagement from '@/pages/pageMetricsManagement.vue'
// import questionsUser from '@/pages/pageQuestions.vue'
import gestorsQuestion from '@/pages/pageGestorsQuestion.vue'
import viewPassword from '@/views/viewPassword.vue'
import viewForm from '@/pages/pageFormUsers.vue'
import pageAnswerQuestions from '@/pages/pageAnswerQuestions.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      name: 'home-user',
      children: [
        {
          path: '/gestor-user',
          name: 'gestors-user',
          component: gestorsUser
        },
        {
          path: '/register-user/:id?',
          name: 'register-user',
          component: registerUser
        },
        {
          path: '/register-question/:id?',
          name: 'register-question',
          component: registerQuestion
        },
        {
          path: '/metrics-management',
          name: 'metrics-management',
          component: metricsManagement
        },
        {
          path: '/gestor-question',
          name: 'gestors-question',
          component: gestorsQuestion
        },
        {
          path: '/view-password',
          name: 'view-password',
          component: viewPassword
        },
        {
          path: '/respuest',
          name: 'respuest',
          component: viewForm
        },
        {
          path: '/answer-question',
          name: 'answer-question',
          component: pageAnswerQuestions,
        },
      ],
      component: MasterPage
    },
  ]
})

export default router
