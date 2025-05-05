import guest from "./lib/guest";
import customer from "./lib/customer";
import { GUEST_TYPE, CUSTOMER_TYPE } from "./types";
import {
  BASE_URL,
  REFRESH_TOKEN_KEY,
  USER_TOKEN_KEY,
} from "../helper/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "../navigation/NavigationService";
import { NAVIGATION_AUTH_LOADING_STACK } from "../navigation/routes";
import { Alert } from "react-native";
import { config } from "../../config/config";
import { useAppDispatch } from "../store/hooks";
import { resetAuth } from "../slices/authSlice/authSlice";

class ApiError extends Error {
  constructor(m: string) {
    super(m);
  }
}

export class AppOperation {
  base_url;
  root_path;
  guest;
  customer;
  value;
  customerToken: string | null | undefined;
  refreshingTokenPromise:string | null | undefined;

  constructor() {
    this.base_url = config.WEBSITE_URL;
    this.root_path = ``;
    this.guest = guest(this);
    this.customer = customer(this);
    this.value = 0;
    this.refreshingTokenPromise = null;
  }
  

  config(config: any) {
    if (config.url) {
      this.base_url = config.url;
    }
  }

  post(path: string, params: any, type: string = GUEST_TYPE) {
    return this.send(path, "POST", null, params, type);
  }

  patch(path: string, params: any, type: string = GUEST_TYPE) {
    return this.send(path, "PATCH", null, params, type);
  }

  put(path: string, params: any, type: string = GUEST_TYPE) {
    return this.send(path, "PUT", null, params, type);
  }

  get(path: string, params?: any, data?: any, type: string = GUEST_TYPE) {
    return this.send(path, "GET", params, data, type);
  }

  delete(path: string, params?: any, data?: any, type: string = GUEST_TYPE) {
    return this.send(path, "DELETE", params, data, type);
  }

  send(url: string, method: string, params: any, data: any, type: string) {
    let uri = `${this.base_url}${this.root_path}${url}`;
  this.value = 0
  if (params) {
        let separator = "?";
        Object.keys(params).forEach((key) => {
          uri += `${separator}${key}=${params[key]}`;
          separator = "&";
        });
      }
      const missingFields = uri.match(/(\{[a-zA-Z0-9_]+\})/g);
      if (missingFields && missingFields.length > 0) {
        return Promise.reject(
          `URL missing parameters: ${missingFields.join(", ")}`
        );
      }
  
    const headers: any = {
      "Content-Type": "application/json",
    };
  
    if (this.customerToken && type === CUSTOMER_TYPE) {
      headers["Authorization"] = `Bearer ${this.customerToken}`;
    }
  
    return new Promise((resolve, reject) => {
      console.log({ uri, method, headers, data, ...params });
  
      let bodyData = null;
          if (data instanceof FormData) {
            bodyData = data;
            headers["Content-Type"] = "multipart/form-data";
          } else {
            bodyData = JSON.stringify(data);
          }

  
      fetch(uri, { method, headers, body: bodyData })
        .then((response) => {
          let status = response.status;
  
          if (response.ok) {
            return response.text().then((responseData) => {
              try {
                let jsonData: any = JSON.parse(responseData);
                resolve({ ...jsonData, code: status });
              } catch (errorResponse) {
                Promise.reject({ code: status, data: errorResponse });
              }
            });
          }
          if (status === 401 && type === CUSTOMER_TYPE) {
            return this.refreshTokenOnce()
              .then((newToken) => {
                headers["Authorization"] = `Bearer ${newToken}`;
                console.log({ uri, method, headers, data, ...params });
                
                return fetch(uri, { method, headers, body: bodyData });
              })
              .then((retryResponse) => {
                if (retryResponse.ok) {
                  return retryResponse.text().then((retryData) => {
                    try {
                      let retryJson = JSON.parse(retryData);
                      
                      resolve({ ...retryJson, code: retryResponse.status });
                    } catch (error) {
                      console.log("error Recall Api",error);
                      reject({ code: retryResponse.status, data: retryData });
                    }
                  });
                }
                return retryResponse.text().then((retryError) => {
                  reject({ code: retryResponse.status, ...JSON.parse(retryError) });
                });
              })
              .catch((refreshError) => {
                reject(new ApiError("Failed to refresh token: " + refreshError));
              });
          }
  
          return response.text().then((errorResponse) => {
            reject({ code: status, ...JSON.parse(errorResponse) });
          });
        })
        .catch((error) => {
          const customError = this.getErrorMessageForResponse(error);
          reject(new ApiError(customError));
        });
    });
  }

  refreshTokenOnce() {
    if (this.refreshingTokenPromise) {
      return this.refreshingTokenPromise; 
    }
  
    this.refreshingTokenPromise = new Promise(async (resolve, reject) => {
      try {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          this.refreshingTokenPromise = null;
          reject("No refresh token available");
          return;
        }
  
        let uri = `${this.base_url}users/refresh-token`;
        let method=`POST`
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        };
  
        console.log({ uri, method, headers });
  
        fetch(uri, { method, headers })
          .then((response) => response.json())
          .then(async (responseData) => {
            if (!responseData.success) {
              this.value++;
              this.logoutaction();
              this.refreshingTokenPromise = null;
              reject("Token refresh failed");
              return;
            }
  
            const { access_token, refresh_token } = responseData?.data;
            await AsyncStorage.setItem(USER_TOKEN_KEY, access_token);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  
            this.setCustomerToken(access_token);
            this.refreshingTokenPromise = null; 
            resolve(access_token);
          })
          .catch((error) => {
            console.log("Refresh token error:", error);
            this.refreshingTokenPromise = null;
            this.value++
            this.logoutaction();
            reject(error);
          });
      } catch (error) {
        console.log("Error in refreshToken:", error);
        this.refreshingTokenPromise = null;
        this.value++
        this.logoutaction();
        reject(error);
      }
    });
  
    return this.refreshingTokenPromise;
  }

  getErrorMessageForResponse(data: any) {
    let message = undefined;
    try {
      message = data?.message;
      
      // if (data?.code === 401) {
      //   this.value++;
      //   this.logoutaction();
      // }
    } catch (e) {
      // console.log("errorr found", e);
    }
    
    switch (data.code) {
      // 100  Informational

      case 100: {
        message = message ? message : "Continue";
        break;
      }

      case 101: {
        message = message ? message : "Switching Protocols";
        break;
      }

      case 102: {
        message = message ? message : "Processing";
        break;
      }

      //Success

      case 201: {
        message = message ? message : "Created";
        break;
      }
      case 202: {
        message = message ? message : "Accepted";
        break;
      }
      case 203: {
        message = message ? message : "Non-authoritative Information";
        break;
      }
      case 204: {
        message = message ? message : "No Content";
        break;
      }
      case 205: {
        message = message ? message : "Reset Content";
        break;
      }
      case 206: {
        message = message ? message : "Partial Content";
        break;
      }
      case 207: {
        message = message ? message : "Multi-Status";
        break;
      }
      case 208: {
        message = message ? message : "Already Reported";
        break;
      }
      case 226: {
        message = message ? message : "IM Used";
        break;
      }

      // 300 Redirection

      case 300: {
        message = message ? message : "Multiple Choices";
        break;
      }
      case 301: {
        message = message ? message : "Moved Permanently";
        break;
      }
      case 302: {
        message = message ? message : "Found";
        break;
      }
      case 303: {
        message = message ? message : "See Other";
        break;
      }
      case 304: {
        message = message ? message : "Not Modified";
        break;
      }
      case 305: {
        message = message ? message : "Use Proxy";
        break;
      }
      case 307: {
        message = message ? message : "Temporary Redirect";
        break;
      }
      case 308: {
        message = message ? message : "Permanent Redirect";
        break;
      }

      // 400 Client Error

      case 400: {
        message = message ? message : "Bad Request";
        break;
      }
      case 401: {
        message = message ? message : "Unauthorized";
        break;
      }
      case 402: {
        message = message ? message : "Payment Required";
        break;
      }
      case 403: {
        message = message ? message : "Forbidden";
        break;
      }
      case 404: {
        message = message ? message : "Not Found";
        break;
      }
      case 405: {
        message = message ? message : "Method Not Allowed";
        break;
      }
      case 406: {
        message = message ? message : "Not Acceptable";
        break;
      }
      case 407: {
        message = message ? message : "Proxy Authentication Required";
        break;
      }
      case 408: {
        message = message ? message : "Request Timeout";
        break;
      }
      case 409: {
        message = message ? message : "Conflict";
        break;
      }
      case 410: {
        message = message ? message : "Gone";
        break;
      }
      case 411: {
        message = message ? message : "Length Required";
        break;
      }
      case 412: {
        message = message ? message : "Precondition Failed";
        break;
      }
      case 413: {
        message = message ? message : "Payload Too Large";
        break;
      }
      case 414: {
        message = message ? message : "Request-URI Too Long";
        break;
      }
      case 415: {
        message = message ? message : "Unsupported Media Type";
        break;
      }
      case 416: {
        message = message ? message : "Requested Range Not Satisfiable";
        break;
      }
      case 417: {
        message = message ? message : "Expectation Failed";
        break;
      }
      case 418: {
        message = message ? message : "I'm a teapot";
        break;
      }
      case 421: {
        message = message ? message : "Misdirected Request";
        break;
      }
      case 422: {
        message = message ? message : "Unprocessable Entity";
        break;
      }
      case 423: {
        message = message ? message : "Locked";
        break;
      }
      case 424: {
        message = message ? message : " Failed Dependency";
        break;
      }
      case 426: {
        message = message ? message : "Upgrade Required";
        break;
      }
      case 428: {
        message = message ? message : "Precondition Required";
        break;
      }
      case 429: {
        message = message ? message : "Too Many Requests";
        break;
      }
      case 431: {
        message = message ? message : "Request Header Fields Too Large";
        break;
      }
      case 444: {
        message = message ? message : "Connection Closed Without Response";
        break;
      }
      case 451: {
        message = message ? message : "Unavailable For Legal Reasons";
        break;
      }
      case 499: {
        message = message ? message : "Client Closed Request";
        break;
      }

      // 500 Server Error

      case 500: {
        message = message ? message : "Internal Server Error";
        break;
      }
      case 501: {
        message = message ? message : "Not Implemented";
        break;
      }
      case 502: {
        message = message ? message : "Internal Server Error";
        break;
      }
      case 503: {
        message = message ? message : "Service Unavailable";
        break;
      }
      case 504: {
        message = message ? message : "Gateway Timeout";
        break;
      }
      case 505: {
        message = message ? message : "HTTP Version Not Supported";
        break;
      }
      case 506: {
        message = message ? message : "Variant Also Negotiates";
        break;
      }
      case 507: {
        message = message ? message : "Insufficient Storage";
        break;
      }
      case 508: {
        message = message ? message : "Loop Detected";
        break;
      }
      case 510: {
        message = message ? message : "Not Extended";
        break;
      }
      case 511: {
        message = message ? message : "Network Authentication Required";
        break;
      }
      case 599: {
        message = message ? message : "Network Connect Timeout Error";
        break;
      }
    }

    return message;
  }

  setCustomerToken(token: string) {
    this.customerToken = token;
  }

  logoutaction() {
    if (this.value === 1) {
      Alert.alert(
        "Login Expired",
        "your session has expired, please login again.",
        [
          {
            text: "ok",
            onPress: () => {
              this.deleteuser();
            },
          },
        ],
        { cancelable: true }
      );
    }
  }

  async deleteuser() {
    const dispatch = useAppDispatch()
    this.value = 0
    appOperation.setCustomerToken("");
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    dispatch(resetAuth())
    NavigationService.reset(NAVIGATION_AUTH_LOADING_STACK);
  }
}

export const appOperation = new AppOperation();