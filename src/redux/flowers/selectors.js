export const selectFlowersListIsLoading = state => state.flowers.listLoading;
export const selectFlowersListError = state => state.flowers.listError;
export const selectFlowersOperationIsLoading = state =>
  state.flowers.operationLoading;
export const selectFlowersOperationError = state =>
  state.flowers.operationError;
export const selectAllFlowersItems = state => state.flowers.all.items;
export const selectAllFlowersHasPreviousPage = state =>
  state.flowers.all.hasPreviousPage;
export const selectAllFlowersHasNextPage = state =>
  state.flowers.all.hasNextPage;
export const selectAllFlowersPage = state => state.flowers.all.page;
export const selectAllFlowersTotalPages = state => state.flowers.all.totalPages;
export const selectAllFlowersTotalItems = state => state.flowers.all.totalItems;

export const selectFavoriteFlowersItems = state => state.flowers.favorite.items;
export const selectFavoriteFlowersHasPreviousPage = state =>
  state.flowers.favorite.hasPreviousPage;
export const selectFavoriteFlowersHasNextPage = state =>
  state.flowers.favorite.hasNextPage;
export const selectFavoriteFlowersPage = state => state.flowers.favorite.page;
export const selectFavoriteFlowersTotalPages = state =>
  state.flowers.favorite.totalPages;
export const selectFavoriteFlowersTotalItems = state =>
  state.flowers.favorite.totalItems;