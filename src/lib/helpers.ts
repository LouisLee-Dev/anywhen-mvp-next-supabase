import moment from "moment";

export const getFileExt = (name: string) => {
  if (name.indexOf(".") >= 0) return name.split(".").pop();
  return "";
};

export const timestamp2str = (timestamp: string) => {
  if (!timestamp) return "";
  return moment(parseInt(timestamp)).format("MMM Do YYYY, h:mm a");
};

export const date2sortablestr = (date: string | Date) => {
  if (!date) return "";
  return moment(date).format("YYYY-MM-DD");
};

export const date2str = (date: string | Date) => {
  if (!date) return "";
  return moment(date).format("MMM Do YYYY");
};

export const sortablestr2date = (date: string) => {
  if (!date) return moment.now();
  return moment(date).format("YYYY-MM-DD");
};

export const datetime2str = (date: string | Date) => {
  if (!date) return "";
  return moment(date).format("MMM Do YYYY, h:mm a");
};

export const date2humanize = (date: string | Date) => {
  if (!date) return "";
  return moment(date).fromNow();
};

export function hexToRGBA(hex: string, alpha = 1) {
  const [r, g, b] = hex.match(/\w\w/g).map((x: string) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
}
