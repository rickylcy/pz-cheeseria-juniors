import React, { useState } from "react";
import CartItem from "./CartItem/CartItem";
import PurchaseDialog from "./PurchaseDialog";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";
import { Button } from "@material-ui/core";
import { NumberLiteralType } from "typescript";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  purchaseItems: (cartItems: CartItemType[]) => void;
  setTotal: (total: number) => void;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  purchaseItems,
  setTotal,
}) => {
  // State for opening dialog component
  const [purchaseDialogOpen, setPurchaseDialogOpen] = React.useState(false);

  // Set dialog for purchase comfirmation's states
  const handlePurchaseDialogOpen = () => {
    setPurchaseDialogOpen(true);
  };
  const handleDialogClose = () => {
    setPurchaseDialogOpen(false);
  };

  // Calculate total amount of the cart
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  // Set total amount state from app component
  const handlePurchaseOnClick = (amount: number) => {
    setTotal(amount);
  };

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button
        onClick={() => {
          handlePurchaseOnClick(
            parseFloat(calculateTotal(cartItems).toFixed(2))
          );
          handlePurchaseDialogOpen();
        }}
        data-cy="btn-purchase"
      >
        Purchase
      </Button>
      <PurchaseDialog
        cartItems={cartItems}
        purchaseItems={purchaseItems}
        purchaseDialogOpen={purchaseDialogOpen}
        handleDialogClose={handleDialogClose}
        total={parseFloat(calculateTotal(cartItems).toFixed(2))}
      />
    </Wrapper>
  );
};

export default Cart;
