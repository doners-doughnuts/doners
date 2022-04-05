import {
  compareAsc,
  differenceInDays,
  format,
  formatDistanceToNowStrict,
} from 'date-fns';
import local from 'date-fns/locale/ko';
// ----------------------------------------------------------------------

// let date = new Date('2022-04-01T02:00:00Z');
// console.log(date);
// //Fri Apr 01 2022 11:00:00 GMT+0900 (Korean Standard Time)
// // console.log(date.getFullYear() + '-' + date.getUTCMonth() + '-' + date.getDate())
// console.log(
//   date.toLocaleDateString('ko-KR').replaceAll(' ', '').replaceAll('.', '/')
// );

export function fDate(date: string) {
  return format(new Date(date), 'yyyy/MM/dd');
}

export function fDateTime(date: string) {
  return format(new Date(date), 'yyyy MM dd HH:mm');
}

export function fDateTimeSuffix(date: string) {
  //// return format(new Date(date), 'dd/MM/yyyy hh:mm p');
  return format(new Date(date), 'yyyy/MMM/dd p');
}

export function fToNow(date: string) {
  //// return formatDistanceToNow(new Date(date), { addSuffix: true, });
  return formatDistanceToNowStrict(new Date(date), {
    locale: local,
    addSuffix: true,
  });
}

export function fDateDash(date: string) {
  return format(new Date(date), 'yyyy-MM-dd');
}

/**
 * 모금가능한 기부인지 검사하는 함수
 * @param {date} expire-date of the Donation
 * @returns true: 마감된 기부 / false: 모금가능한 기부
 */
export function checkClosedDonation(date: string) {
  return differenceInDays(new Date(date), new Date()) <= -1;
}
