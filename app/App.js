import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import ShoppingList from './ShoppingList';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ShoppingList />
    </Provider>
  );
};

export default App;
