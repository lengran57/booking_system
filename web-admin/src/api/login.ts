import { http } from '@/utils/http'
import type { RegisterUser, UpdatePassword } from './model/loginModel'

export function login(username: string, password: string) {
  return http({
    url: '/user/admin/login',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}

export function register(data: RegisterUser) {
  return http({
    url: '/user/register',
    method: 'post',
    data,
  })
}

export function sendRegisterCaptcha(type: number, email: string) {
  return http({
    url: '/user/send-captcha',
    method: 'get',
    params: {
      type,
      email,
    },
  })
}

export function updatePassword(data: UpdatePassword) {
  return http({
    url: '/user/update_password',
    method: 'post',
    data,
  })
}
