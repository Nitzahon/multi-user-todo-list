import { v4 as uuid } from "uuid";

let authenticationToken = null;

export const setAuthenticationToken = (newToken) => {
  authenticationToken = newToken;
};



const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const populateUrl = (urlTemplate, params) => {
  if (!urlTemplate || typeof urlTemplate !== "string" || !params || typeof params !== "object") {
    return urlTemplate;
  }

  let populatedURL = urlTemplate;
  Object.keys(params).forEach((paramKey) => {
    const regex = new RegExp(`/:${paramKey}`);
    populatedURL = populatedURL.replace(regex, `/${params[paramKey]}`);
  });

  return populatedURL;
};

const createQueryParamsString = (queryParams) => {
  if (!queryParams || typeof queryParams !== "object") {
    return "";
  }

  return (
    "?" +
    Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join("&")
  );
};

const buildUrl = (urlTemplate, params, queryParams) => {
  const url = populateUrl(urlTemplate, params);

  const queryString = createQueryParamsString(queryParams);
  return `${url}${queryString}`;
};

const setRequestHeaders = () => {
  const headers = {
    "x-correlation-id": uuid(),
    "content-type": "application/json",
  };

  if (authenticationToken) {
    headers.Authorization = `Bearer ${authenticationToken}`;
  }

  return headers;
};

const handleErrorResponse = async (response) => {
  if (response.status === 401) {
    // Return an action-like error payload
    throw {
      message: "Unauthorized",
      status: 401,
    };
  }

  // Parse and return other errors
  const errorData = await response.json();
  throw {
    message: errorData.message || "An error occurred",
    status: response.status,
  };
};

const invokeRequest = async (method, { urlTemplate, params, body, queryParams}) => {
  const url = buildUrl(urlTemplate, params, queryParams);

  
  try {
    const response = await fetch(url, {
      method,
      headers: setRequestHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {   
      await handleErrorResponse(response);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      
      return await response.json();
      
    }

    return response.text();
  } catch (error) {  
    return Promise.reject({
      message: error.message,
      status: error.status || 500, // Fallback to 500 if no status is present
    });
  }
};

const RESTService = {
  get: (urlTemplate, params = null, queryParams = null) =>
    invokeRequest(methods.GET, { urlTemplate, params, queryParams }),

  post: (urlTemplate, params = null, body = null) =>
    invokeRequest(methods.POST, { urlTemplate, params, body }),

  put: (urlTemplate, params = null, body = null) =>
    invokeRequest(methods.PUT, { urlTemplate, params, body }),

  delete: (urlTemplate, params = null) =>
    invokeRequest(methods.DELETE, { urlTemplate, params }),
};

export default RESTService;
