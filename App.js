import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/index';
import Home from './src/components/home';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
};

export default App;
