import _ from "lodash";
import { so } from "./requests";

const fetchJSON = async (
  url: string,
  options?: RequestInit,
  data?: any,
  formData?: any,
  error?: (error: any) => void,
) => {
  let modifiedURL = url;
  let modifiedOptions = options;
  // Read stored token from localStorage (fallback for browsers blocking 3rd-party cookies)
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('_tb26_token') : null;
  let defaultHeaders = {
    mode: "cors" as RequestMode,
    credentials: "include" as RequestCredentials,
    ...(storedToken ? { headers: { Authorization: `Bearer ${storedToken}` } } : {}),
  };
  if (
    (options?.method === "POST" ||
      options?.method === "PUT" ||
      options?.method === "PATCH") &&
    !formData
  ) {
    modifiedOptions = _.merge(
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
      defaultHeaders,
      options,
    );
  } else if (
    (options?.method === "POST" ||
      options?.method === "PUT" ||
      options?.method === "PATCH") &&
    formData
  ) {
    modifiedOptions = _.merge(
      {
        body: data,
      },
      defaultHeaders,
      options,
    );
  } else {
    modifiedURL = url + "?" + new URLSearchParams(data);
    modifiedOptions = _.merge(defaultHeaders, options);
  }

  try {
    console.log(`[API] ${options?.method || 'GET'} ${modifiedURL}`);
    const response = await fetch(modifiedURL, modifiedOptions);
    const json = await response.json();
    
    if (response.ok && json.succeed !== false) {
      return json;
    } else {
      if (error) {
        error(json);
      }

      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        console.error({ msg: json.msg || json.message, status: response.status });
        throw new Error(json.msg || json.message);
      }
    }
  } catch (err: any) {
    // Network error - server not reachable
    if (err.name === "TypeError" && (err.message === "Failed to fetch" || err.message.includes("Failed to fetch"))) {
      console.error("Network error: Backend server not reachable");
      console.error("Attempted URL:", modifiedURL);
      console.error("Backend API:", so);
      throw new Error("Unable to connect to server. Please check if the backend is running or your internet connection.");
    }
    throw err;
  }
};

export default fetchJSON;
