/**
 * Reducers for cart state
 *
 * @format
 * @flow
 */
import { ADD_ONE_ITEM, REMOVE_ONE_ITEM, REMOVE_FROM_CART } from '../actions/cart';
import type { itemType } from '../../flow/types';

// Cart Initial State
const initialState = {
  itens_count: 0,
  total_price: 0,
  items: {},
};

type stateType = {
  itens_count: number,
  total_price: number,
  items: { [string]: itemType },
};

const cart = (
  state: stateType = initialState,
  action: { type: string, item: itemType, id: string }
) => {
  switch (action.type) {
    case ADD_ONE_ITEM: {
      // Add a item to badge display
      const itensCount = state.itens_count + 1;

      // Sum product price to Total price
      const totalPrice = state.total_price + action.item.price;

      let { items } = state;

      // Check if item is already in cart
      if (state.items[action.item.id]) {
        // Change onCart value form a item already in cart
        items[action.item.id] = {
          ...action.item,
          onCart: items[action.item.id].onCart + 1,
        };
      } else {
        // Create a items object combining actual items with new item
        items = {
          ...items,
          [action.item.id]: { ...action.item, onCart: 1 },
        };
      }
      // Update our redux state
      return {
        itens_count: itensCount,
        total_price: totalPrice,
        items,
      };
    }
    case REMOVE_ONE_ITEM: {
      // Remove a item to badge display
      const itensCount = state.itens_count - 1;

      // Get the new total price to Total price
      const totalPrice = state.total_price - action.item.price;

      // Change onCart value form a item already in cart and combine with other items
      const items = { state };
      items[action.item.id] = {
        ...action.item,
        onCart: (items[action.item.id].onCart || 0) - 1,
      };
      return {
        itens_count: itensCount,
        total_price: totalPrice,
        items,
      };
    }
    case REMOVE_FROM_CART: {
      // Calculate the new Cart item count
      const itensCount = state.itens_count - (state.items[action.id].onCart || 0);

      // Calculate the new total price removing the amount of the item removed
      const totalPrice =
        state.total_price - (state.items[action.id].onCart || 0) * state.items[action.id].price;

      // Create a new items object without the item with specific key(action.id)
      const items = Object.keys(state.items).reduce((object, key) => {
        const newObj = object;
        if (key !== action.id) {
          newObj[key] = state.items[key];
        }
        return newObj;
      }, {});

      return {
        itens_count: itensCount,
        total_price: totalPrice,
        items,
      };
    }
    default: {
      return state;
    }
  }
};

export default cart;
