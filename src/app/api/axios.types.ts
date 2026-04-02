import type { AxiosError } from "axios";

export type AxiosErrorDto = AxiosError<{ message: string }>;
