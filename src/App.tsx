import 'react-native-gesture-handler';
import React from 'react';
import MainNavigation from './navigation/navigation';

import { PersistGate } from "redux-persist/integration/react"
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { store, persistor } from './stores/index';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <MainNavigation />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
