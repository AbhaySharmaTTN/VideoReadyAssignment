import { Provider, useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  //   persistor.purge();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
