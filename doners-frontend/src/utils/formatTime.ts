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
  console.log(date);
  //// return formatDistanceToNow(new Date(date), { addSuffix: true, });
  return formatDistanceToNowStrict(new Date(date), {
    locale: local,
    addSuffix: true,
  });
}

export function fDateDash(date: string) {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function fDateChange(date: string) {
  return String(new Date(date).getTime());
}

/**
 * 모금가능한 기부인지 검사하는 함수
 * @param {date} expire-date of the Donation
 * @returns true: 마감된 기부 / false: 모금가능한 기부
 */
export function checkClosedDonation(date: string) {
  const now = new Date(new Date().toDateString()).getTime();
  const end = new Date(new Date(date).toDateString()).getTime();

  const diff = now - end;
  // const result = Math.abs(diff / (1000 * 3600 * 24));
  //* @신지우 수정 (절댓값)
  const result = Math.floor(diff / (1000 * 3600 * 24));
  // console.log(result > 0, result);
  return result > 0;
}

/**
 * 남은 모금일자 계산 (D-day)
 * @param {endDate} 마감일자, 'yyyy-MM-dd' 형태
 * @returns D-day string
 */
export function calcDday(endDate: string) {
  const now = new Date(new Date().toDateString()).getTime();
  const end = new Date(new Date(endDate).toDateString()).getTime();

  const diff = now - end;
  const dday = Math.floor(diff / (1000 * 3600 * 24));

  if (dday === 0) {
    return '(마감일)';
  } else {
    const label = dday > 0 ? '+' : '';
    return '(D' + label + dday + ')';
  }
}

/* Fundraiser Contract time */
export function fFundraiserContractTime(date: string) {
  return fDateTime(new Date(Number(date) * 1000).toString());
}
