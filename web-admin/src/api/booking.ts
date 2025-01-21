import { http } from '@/utils/http'

export function getBookings(params: any) {
  return http({
    url: '/booking/list',
    method: 'get',
    params,
  })
}
