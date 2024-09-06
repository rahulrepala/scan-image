import Axios from "axios";
import { BACKEND_URL } from "./Utilties/Constants";

export class WebApimanager {

    imagePost(url, data) {
    try {
      let baseURL = BACKEND_URL;
      console.log(baseURL + url)
      let headers = {
        "Content-Type": "multipart/form-data",
      };
      return Axios.post(baseURL + url, data, { headers })
        .then((res) => {
          if (res.status >= 200 && res.status < 500) {
            console.log("Response data:", res.data);
            return res;
          } else {
            throw new Error(`Unexpected status code: ${res.status}`);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            //Setting a Custom error message if authorization failed
            error.customErrorMessage =
              "Apologies! An error occurred. Please log in again to continue.";
          }
 
          throw error;
        });
    } catch (e) {
      console.log(
        `Failure`,
        `Something went wrong. Please try again after sometime.`,
        "error"
      );
    }
  }
 

 
}