/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(
  date?: dayjs.ConfigType,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}

export function formatToDate(
  date?: dayjs.ConfigType,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format)
}
/**
 * @description 根据输入天数计算日期
 */
export function calculateDueDate(day: number) {
  const resultDate = dayjs().add(day, 'day')
  return resultDate.format('YYYY-MM-DD')
}

export const dateUtil = dayjs
