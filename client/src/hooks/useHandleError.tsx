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
        Object.keys(errorMessage).forEach((key) => {
          setError(key as keyof typeof initialFormState, {
            message: errorMessage[key] as string,
            type: "Server",
          });
        });
      }
      toast.error((errorResult.error as any).data.message);
    }
  }, [errorResult.isError]);
};

export default useHandlerError;
