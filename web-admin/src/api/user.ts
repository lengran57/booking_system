import { http } from '@/utils/http'
import type { UserInfo, UserQueryParams } from './model/userModel'

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

export function getUsers(params: UserQueryParams) {
  return http({
    url: '/user/list',
    method: 'get',
    params,
  })
}
export function freezeUser(id: number) {
  return http({
    url: '/user/freeze',
    method: 'get',
    params: {
      id,
    },
  })
}
