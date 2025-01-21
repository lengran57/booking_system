import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/index/index.vue'),
        },
        {
          path: 'meeting_room_manage',
          name: 'MettingRoomManage',
          component: () => import('@/views/meeting-room-manage/index.vue'),
        },
        {
          path: 'booking_manage',
          name: 'BookingManage',
          component: () => import('@/views/booking-manage/index.vue'),
        },
        {
          path: 'user_manage',
          name: 'UserManage',
          component: () => import('@/views/user-manage/index.vue'),
        },
        {
          path: 'statistics',
          name: 'Statistics',
          component: () => import('@/views/statistics/index.vue'),
        },
        {
          path: 'update_info',
          name: 'UpdateInfo',
          component: () => import('@/views/update-info/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/index.vue'),
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: () => import('@/views/forget-password/index.vue'),
    },
  ],
})

export default router
