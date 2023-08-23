import axios from "axios";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export function axiosErrorHandler(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      return error.response.data as
        | { message: string }
        | { detail: { loc: string[] }; msg: string; type: string }[];
    }
  } else {
    return {
      message: getErrorMessage(error),
    };
  }
}
