export interface RegisterUser {
  username: string
  nickName: string
  password: string
  email: string
  captcha: string
}
export interface UpdatePassword {
  username: string
  email: string
  captcha: string
  password: string
  confirmPassword: string
}
