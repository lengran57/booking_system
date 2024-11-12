import { IsEmail, IsNotEmpty } from 'class-validator';
export class sendCaptchaDto {
  @IsNotEmpty({
    message: '请输入type',
  })
  type: number;

  @IsNotEmpty({
    message: '请输入邮箱',
  })
  @IsEmail(
    {},
    {
      message: '请输入合法邮箱',
    },
  )
  email: string;
}
