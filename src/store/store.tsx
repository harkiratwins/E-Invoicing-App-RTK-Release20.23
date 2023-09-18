import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api-services';
import { InvoiceApi } from '../services/invoice-api';

export const store = configureStore({
  reducer: {
    // [api.reducerPath]: api.reducer,
   [ InvoiceApi.reducerPath]:InvoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(InvoiceApi.middleware),
});


export default store;


