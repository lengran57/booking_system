import { http } from '@/utils/http'

export function uploadImage(file: File) {
  return http({
    url: '/upload/image',
    method: 'post',
    data: { file },
  })
}
