import { useCallback, useState } from "react";
import axios, { type AxiosRequestConfig } from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function useApiCaller<T>() {
    const [data, setData] = useState<T | null>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const request = useCallback(async (
        url: string,
        method: HttpMethod,
        body?: unknown,
        options?: AxiosRequestConfig<unknown>
    ) => {
        try {
            setLoading(true);
            const response = await axios({
                url: url,
                method: method,
                data: body,
                ...options
            });
            setData(response.data);
        } catch (error: unknown) {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error
                    ? error.message
                    : "Đã có lỗi xảy ra";
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    }, []);
    return { data, isLoading, errorMessage, request };
}