import { useState } from 'react';
import Cart from './Cart/Cart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Wrapper, Menus, MenuBox, StyledButton } from './App.styles';
import { data } from './arrayData';

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  amount: number;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((nums: number, item) => nums + item.amount, 0);

  const handleAddToCart = (clickedItem: any) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[]),
    );
  };

  return (
    <Wrapper>
      <Menus>
        {data?.map(item => (
          <MenuBox>
            <div>
              <img src={item.image} />
            </div>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <button onClick={() => handleAddToCart(item)}>추가</button>
          </MenuBox>
        ))}
      </Menus>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Cart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
    </Wrapper>
  );
};

export default App;
