import { AxiosError } from "axios";
import { toast } from "sonner";

// Define the shape of the API error response
interface ApiErrorResponse {
  message: string;
}

/**
 * Generalized function to handle API requests with error handling and loading state.
 *
 * @param requestCallback - The API request logic (e.g., axios.post)
 * @param setLoading - Function to set the loading state in the component
 * @returns The API response data if successful, or null if there's an error.
 */

export const handleAuthRequest = async <T>(
  requestCallback: () => Promise<T>,
  setLoading?: (loading: boolean) => void,
  showError: boolean = true, // 👈 default true
): Promise<T | null> => {
  if (setLoading) {
    setLoading(true);
  }

  try {
    const response = await requestCallback();
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    console.log(error);

    if (showError) {
      if (axiosError?.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }

    return null;
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};
