// authUtils.js (or any appropriate file)
export function getAuthToken() {
  const localStorageData = localStorage.getItem("persist:tech-shop/user");
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    console.log(parsedData);
    return parsedData.token ? JSON.parse(parsedData.token) : null;
  }
  return null;
}
