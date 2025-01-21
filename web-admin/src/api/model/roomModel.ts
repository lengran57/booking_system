export interface RoomQuery {
  name: string
  capacity: number
  equipment: string
  pageNo: number
  pageSize: number
}
export interface RoomData {
  id?: string
  name: string
  capacity: string
  location: string
  equipment: string
  description: string
}
