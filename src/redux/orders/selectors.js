export const selectAllOrders = (state) => state.orders.items;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersIsLoading = (state) => state.orders.isLoading;
export const selectOrdersIsError = (state) => state.orders.error;
export const selectAllOrdersTotalItems = (state) => state.orders.totalOrders;
export const selectAllOrdersTotalPages = (state) => state.orders.totalPages;
export const selectAllOrdersCurrentPage = (state) => state.orders.currentPage;
