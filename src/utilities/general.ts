import moment from "moment";
import { parse } from "tldts";
import { variables } from "./variables";

export const filterWordCount = (name: string, count: number = 2) => {
  let splitNames = name.split(" ").filter((text) => text.length);
  return splitNames.length > count ? splitNames.slice(0, count).join(" ") : name;
};

export const Greeting = () => {
  let presentTime = new Date();
  let hrs = presentTime.getHours();
  if (hrs < 12) {
    return "Good morning";
  } else if (hrs >= 12 && hrs < 17) {
    return "Good afternoon";
  } else return "Good evening";
};

export function sterilizeNumber(text: string): string {
  let value = parseInt(text.replace(/[^0-9]/g, ""));
  return value ? value.toString() : "";
}

export const heatCheck = (dob: string) => {
  const today = moment().format("YYYY-MM-DD");
  const maturityDate = moment(dob).add(6, "months").format("YYYY-MM-DD");
  return {
    mature: today > maturityDate,
    maturityDate: maturityDate,
    formattedDate: moment(maturityDate).format("dddd, Do MMM YYYY"),
  };
};

export const randomString = (
  length: number = 16,
  chars: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) => {
  var result = "";
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export const timeReference = (prefix?: string, suffix?: string, separator: string = "_") => {
  const prefixString = Boolean(prefix) ? prefix + separator : "";
  const suffixString = Boolean(suffix) ? separator + suffix : "";

  return prefixString + new Date().getTime().toString() + suffixString;
};

export const maxItems = (data: any[] = [], count?: number) => {
  if (count && count <= data.length) return data.slice(0, count);
  return data;
};

export const getSubDomain = (defaultDomain?: string) => {
  const subdomain = parse(window.location.href).subdomain;
  let selSubDomain = subdomain && subdomain.length > 1 ? subdomain : defaultDomain;
  if (selSubDomain && variables.invalidSubDomains.includes(selSubDomain)) return undefined;
  return selSubDomain;
};

export const redirectTo = (address: string) => {
  window.location.href = address;
  return;
};

export const convertObjectToURLParams = (data: any) => {
  const params = Object.keys(data)
    .map((key) => {
      const rc = data[key];
      if (rc !== undefined && rc !== null) {
        return `${key}=${encodeURIComponent(rc)}`;
      }
      return "";
    })
    .join("&");
  // console.log(params)
  return params;
};

export const rangeOfNumbers = (start: number = 0, end: number = 0) => {
  return Array.from({ length: end + 1 - start }, (v, k) => k + start);
};

export const getStatusColorScheme = (status: string) => {
  let style;
  switch (status) {
    case "pending":
      style = { backgroundColor: "#FEF4E1", color: "#FBA110" };
      break;
    case "rejected":
      style = { backgroundColor: "#FFEAED", color: "#DB1D1A" };
      break;
    case "approved":
      style = { backgroundColor: "#DFF2EE", color: "#00A788" };
      break;
    case "successful":
      style = { backgroundColor: "#DFF2EE", color: "#00A788" };
      break;
    case "draft":
      style = { backgroundColor: "#ECF0F5", color: "#14171A" };
      break;
  }
  return style;
};

export const allMonths = () => {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
};

export const abbrString = (string: string, swap = [0, 1]) => {
  const split = string.split(" ");
  if (split.length == 1) return string;

  return `${split[swap[0]]}.${split[swap[1]].charAt(0)}`;
};

export const getDaysLeft = (date: moment.MomentInput) => {
  const specificDate = moment(date);

  const currentDate = moment();

  const daysLeft = specificDate.diff(currentDate, "days");
  if (daysLeft === 0) {
    return `Expires Today`;
  } else if (daysLeft < 0) {
    return "Expired";
  } else {
    return `${daysLeft} Days Left`;
  }
  // return daysLeft === 0 ? 0 : daysLeft;
};

export const formatDate = (date: moment.MomentInput) => {
  const formattedDate = moment(date).format("MMM. D, YYYY");
  return formattedDate;
};

export const getPercentage = (total: number, currentVal: number) => {
  const percentage = (currentVal * 100) / total;
  return percentage;
};

export const extractFileNameFromUrl = (url: string | URL) => {
  if (url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const pathSegments = pathname.split("/");
    const filenameWithParams = pathSegments[pathSegments.length - 1];
    const filenameSegments = filenameWithParams.split("?");
    const filename = filenameSegments[0];
    return filename;
  }
};

export const getTimeDifference = (date: moment.MomentInput) => {
  const specificDate = moment(date);

  const currentDate = moment();

  const timeDifference = currentDate.diff(specificDate, "seconds");
  return timeDifference;
};
