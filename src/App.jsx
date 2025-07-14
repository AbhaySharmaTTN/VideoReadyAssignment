import { Provider, useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from './utils/colors';

const App = () => {
    // persistor.purge();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.appButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
