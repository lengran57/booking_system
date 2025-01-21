import { http } from '@/utils/http'
import type { RoomQuery, RoomData } from './model/roomModel'

export function getRoomList(params: RoomQuery) {
  return http({
    url: '/meeting-room/list',
    method: 'get',
    params,
  })
}

export function createRoom(data: RoomData) {
  return http({
    url: '/meeting-room/create',
    method: 'post',
    data,
  })
}
export function updateRoom(data: RoomData) {
  return http({
    url: '/meeting-room/update',
    method: 'put',
    data,
  })
}
