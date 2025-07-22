// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// // export const helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });


// import {onRequest} from "firebase-functions/v1/https";
// import * as logger from "firebase-functions/logger";
// import axios from "axios";

// // This is the base URL for your EC2 backend.
// const apiBaseUrl = "http://3.101.105.213";

// export const api = onRequest(async (request, response) => {
//   // Set CORS headers to allow your web app to access this function.
//   response.set("Access-Control-Allow-Origin", "https://decij.web.app");
//   response.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   response.set("Access-Control-Allow-Headers", "Content-Type");

//   // Handle preflight OPTIONS requests.
//   if (request.method === "OPTIONS") {
//     response.status(204).send("");
//     return;
//   }

//   const targetUrl = `${apiBaseUrl}${request.originalUrl}`;
//   logger.info(`Proxying request to: ${targetUrl}`);

//   try {
//     // Forward the incoming request to your EC2 backend using axios.
//     const axiosResponse = await axios({
//       method: request.method,
//       url: targetUrl,
//       data: request.body,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       responseType: "json",
//     });

//     // Send the response from the EC2 server back to the original caller.
//     response.status(axiosResponse.status).send(axiosResponse.data);
//   } catch (error) {
//     logger.error("Error proxying request:", error);
//     if (axios.isAxiosError(error) && error.response) {
//       // If the error came from the backend service, forward its response.
//       response.status(error.response.status).send(error.response.data);
//     } else {
//       // For other errors (e.g., network issues), send a generic 500 error.
//       response.status(500).send("An unexpected error occurred while proxying the request.");
//     }
//   }
// });


import {onRequest} from "firebase-functions/v1/https";
import * as logger from "firebase-functions/logger";
import axios from "axios";

// This is the base URL for your EC2 backend.
const apiBaseUrl = "http://3.101.105.213";

export const api = onRequest(async (request, response) => {
  // Set CORS headers to allow your web app to access this function.
  response.set("Access-Control-Allow-Origin", "https://decij.web.app");
  response.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS requests.
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  const targetUrl = `${apiBaseUrl}${request.originalUrl}`;
  logger.info(`Proxying request to: ${targetUrl}`);

  try {
    // Forward the incoming request to your EC2 backend using axios.
    const axiosResponse = await axios({
      method: request.method,
      url: targetUrl,
      data: request.body,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    // Send the response from the EC2 server back to the original caller.
    response.status(axiosResponse.status).send(axiosResponse.data);
  } catch (error: any) { // Change is in this block
    logger.error("Error proxying request:", error);
    // Check if the error object has a 'response' property.
    // This is a reliable signature of an Axios network error.
    if (error.response) {
      response.status(error.response.status).send(error.response.data);
    } else {
      response.status(500).send("An unexpected error occurred while proxying the request.");
    }
  }
});
