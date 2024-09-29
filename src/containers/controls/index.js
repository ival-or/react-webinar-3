import {memo, useCallback} from 'react';
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ControlsLayout from "../../components/controls-layout";
import HomeButton from "../../components/home-button";

function Controls() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  };

  return (
    <ControlsLayout>
      <HomeButton />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
    </ControlsLayout>
  );
}

export default memo(Controls);
