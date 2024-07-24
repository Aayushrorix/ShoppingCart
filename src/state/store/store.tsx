import { configureStore } from "@reduxjs/toolkit";
import { shoppingApi } from "../slices/ShoppingCartSlices";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate()


export const rtkQueryErrorLogger: any =
  (api: any) => (next:any) => (action:any) => {
    // isRejectedWithValue Or isRejected
    
      if (action.payload?.status === 401) {
        console.log("error auth");
        localStorage.clear()
        // navigate('/login')
      }
    

    return next(action);
};


export const store = configureStore({
    reducer: {
        [shoppingApi.reducerPath] : shoppingApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shoppingApi.middleware,rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;