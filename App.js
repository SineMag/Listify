import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import ShoppingList from './app/ShoppingList';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.header}>Shopping List App</Text>
        <ShoppingList />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
