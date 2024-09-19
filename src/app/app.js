import React from 'react';
import Cart from "./cart";
import Main from "./main";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const modalState = store.getState().modalState

  return (
    <>
      <Main store={store}/>
      {modalState && <Cart store={store}/>}
    </>
  )
}

export default App;
