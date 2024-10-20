import axios from "axios";

let isInterceptorSetup = false;

export const setupErrorHandlingInterceptor = () => {
    if(!isInterceptorSetup) {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const statusCode = error.response.statusCode;
                    const data = error.response.data;
                    
                    switch (statusCode) {
                        case 400:
                            if (data.errors) {
                               const modelStateErrors = [];
                               
                               for (const item of data.errors) {
                                   const property = item.property;
                                   const errorMessage = item.errorMessage;
                                   
                                   if (property && errorMessage) {
                                       modelStateErrors.push(`${property}: ${errorMessage}`);
                                   }
                               }
                                console.error(modelStateErrors);
                               
                            } 
                            break;
                        case 401:
                            console.error('Unauthorized:', data);
                            break;
                        case 403:
                            console.error('Forbidden:', data);
                            break;
                        case 404:
                            console.error('Not Found:', data);
                            break;
                        case 500:
                            console.error('Internal Server Error:', data);
                            break;
                        default:
                            console.error('An error occurred:', data);
                    }
                }
                return Promise.reject(error);
            }
        );
        isInterceptorSetup = true;
    }
};