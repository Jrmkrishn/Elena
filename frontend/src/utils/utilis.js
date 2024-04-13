import CryptoJS from "crypto-js";

let secretPass =
  import.meta.env.SECRET_KEY ||
  "530c3c35956d15c5fae3a877f41a563347df31e911d282c081c86864f7f44981";

export const setToLocal = (label, data) => {
  let encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretPass
  ).toString();
  localStorage.setItem(label, encryptedData);
  return encryptedData;
};

export const getFromLocal = (label) => {
  const data = localStorage.getItem(label);
  const bytes = CryptoJS.AES.decrypt(data, secretPass);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
