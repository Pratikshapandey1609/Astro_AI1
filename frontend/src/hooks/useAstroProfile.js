import { astroApi } from "../services/astroApi";
import { useAsyncRequest } from "./useAsyncRequest";

export function useAstroProfile() {
  const saveProfile = useAsyncRequest(astroApi.createProfile);
  const calculate = useAsyncRequest(astroApi.calculateAstrology);

  return {
    profile: saveProfile.data?.profile || null,
    calculatedChart: calculate.data || null,
    loading: saveProfile.loading || calculate.loading,
    error: saveProfile.error || calculate.error,
    saveProfile: saveProfile.execute,
    calculateBirthChart: calculate.execute
  };
}
