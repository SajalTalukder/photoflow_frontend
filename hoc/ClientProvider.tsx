"use client";

import store from "@/store/store";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [persistor, setPersistor] = useState<Persistor | null>(null);

  useEffect(() => {
    // Initialize persistor only on the client side
    const clientPersistor = persistStore(store);
    setPersistor(clientPersistor);
  }, []);

  // While persistor is not initialized, render nothing or a loading state
  if (!persistor) {
    return null; // or return a loading spinner if desired
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ClientProvider;
