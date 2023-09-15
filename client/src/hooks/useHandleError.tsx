import { useEffect } from "react";
import { isEntityError } from "../utils/helper";
import { toast } from "react-toastify";

const useHandlerError = (
  errorResult: any,
  setError: any,
  initialFormState: any
) => {
  useEffect(() => {
    if (errorResult.isError) {
      if (isEntityError(errorResult.error)) {
        const errorMessage = errorResult.error.data.message;
        if (errorMessage && typeof errorMessage === "object") {
          Object.keys(errorMessage).forEach((key) => {
            setError(key as keyof typeof initialFormState, {
              message: errorMessage[key] as string,
              type: "Server",
            });
          });
        }
      }

      toast.error(
        (errorResult.error &&
          errorResult.error.data &&
          errorResult.error.data.message) ||
          "An error occurred."
      );
    }
  }, [errorResult.isError]);
};

export default useHandlerError;
