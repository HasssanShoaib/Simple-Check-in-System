// builds a string of url query parameters
export const encodeData = (dataObj) => {
  return Object.keys(dataObj).map((key) => {
      return [key, dataObj[key]].map(encodeURIComponent).join("=");
  }).join("&");
}  