import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export { imageStatusStore } from "./imageStatus";

export {
  useSetFormDirty,
  useIsFormFiltersDirty,
  useIsFormProfileUpdateDirty,
  useIsFormProfileCreateDirty,
} from "./useDirtyForms";
export {
  useGetPlatform,
  useGetPlatformForApp,
  useSetPlatform,
  useIsBase,
} from "./usePlatform";
export {
  useLikesCards,
  useViewingCards,
  type StoreItemCardProfile,
  type ProfileCardsMutationResult,
} from "./useProfileCards";
export { useCities, type StoreItemCities } from "./useCities";
export { useFilters, type StoreItemFilters } from "./useFilters";
export { useProfile, type StoreItemProfile } from "./useProfile";
export { useSympathyCards } from "./useSympathyCards";
