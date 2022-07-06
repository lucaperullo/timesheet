import { Auth } from "aws-amplify";

export function isFerialDay(day: number, month: number, year: number) {
  const date = new Date(year, month, day);

  return date.getDay() === 0 || date.getDay() === 6;
}
export function arrayToString(array: any) {
  let string = "";

  if (array.days?.length > 0) {
    array?.days?.forEach((element: { hours: { toString: () => string } }) => {
      string += element.hours.toString();
    });
  }

  return string;
}
export async function checkGroup(group: string) {
  let data = await Auth.currentAuthenticatedUser();
  // console.log("auth current", data);
  return (
    data.signInUserSession.accessToken.payload["cognito:groups"] || []
  ).includes(group);
}
export {};
