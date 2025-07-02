import { isAxiosError } from "axios";

export const resolveError = (error : unknown) => {
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
    }
}