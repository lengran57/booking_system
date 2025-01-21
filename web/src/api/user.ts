import { http } from '@/utils/http'
import type { UserInfo } from './model/userModel'

export function getUserInfo() {
  return http({
    url: '/user/info',
    method: 'get',
  })
}

export function updateInfo(data: UserInfo) {
  return http({
    url: '/user/update',
    method: 'put',
    data,
  })
}
