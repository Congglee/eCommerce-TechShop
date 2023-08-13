import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[];
}

interface EntityError {
  status: 400;
  data: {
    message: ErrorFormObject;
  };
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isEntityError(error: unknown): error is EntityError {
  if (
    typeof error === "object" &&
    error !== null &&
    error !== undefined &&
    "status" in error &&
    (error as any).status === 400
  ) {
    const entityError = error as EntityError;
    return (
      entityError.status === 400 &&
      typeof entityError.data === "object" &&
      entityError.data !== null &&
      !Array.isArray(entityError.data)
    );
  }
  return false;
}
