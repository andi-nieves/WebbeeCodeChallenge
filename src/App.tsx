import 'react-native-gesture-handler';
import React from 'react';
import MainNavigation from './navigation/navigation';
import { Provider } from 'react-redux';
import { store } from './stores/index';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <MainNavigation />
      </MenuProvider>
    </Provider>
  );
};

export default App;
