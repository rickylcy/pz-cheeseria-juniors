import React, { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Cart/Item/Item";
import Cart from "./Cart/Cart";
import ItemDialog from "./Cart/Item/ItemDialog";
import RecentPurchaseDialog from "./RecentPurchaseDialog";

import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import Badge from "@material-ui/core/Badge";

// Styles
import {
  Wrapper,
  StyledButton,
  StyledAppBar,
  HeaderTypography,
} from "./App.styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

// Fetch cheeses json data from server
const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

// Fetch recent purchases json data from server
const getRecentPurchases = async (): Promise<String> =>
  await (await fetch(`api/recent`)).json();

const App = () => {
  // State for opening dialog component
  const [itemDialogOpen, setItemDialogOpen] = React.useState(false);
  const [recentDialogOpen, setRecentDialogOpen] = React.useState(false);

  // Item info for the pop up dialog
  const [item, setItem] = React.useState({} as CartItemType);

  // Total amount of the purchase
  const [total, setTotal] = React.useState(-1 as number);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  // useQuery for fetching cheese data
  const {
    data: cheeseData,
    isLoading: cheeseLoading,
    error: cheeseError,
  } = useQuery<CartItemType[]>("cheeses", getCheeses);

  // useQuery for fetching purchases history from database
  // disabled it from automatically running
  const {
    data: recentPurchases,
    isLoading: recentPurchasesLoading,
    error: recentPurchasesError,
    refetch: refetchRecentPurchases,
  } = useQuery<String>("recent", getRecentPurchases, {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  // Set popup dialog for item cards' state
  const handleItemDialogOpen = () => {
    setItemDialogOpen(true);
  };

  const handleItemDialogClose = () => {
    setItemDialogOpen(false);
  };

  // Set popup dialog for recent purchases' state
  const handleRecentDialogOpen = () => {
    setRecentDialogOpen(true);
  };

  const handleRecentDialogClose = () => {
    setRecentDialogOpen(false);
  };

  // POST method for purshase item
  // params: cartItems, total
  const purchaseItems = async (): Promise<any> => {
    await fetch(`api/purchase`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // sending cart items and total amount of the cart to server
      body: JSON.stringify({ cartItems: cartItems, total: total }),
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  };

  if (cheeseLoading || recentPurchasesLoading) return <LinearProgress />;
  if (cheeseError || recentPurchasesError)
    return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledButton
              onClick={async () => {
                await refetchRecentPurchases();
                handleRecentDialogOpen();
              }}
            >
              <RestoreIcon />
              <Typography variant="subtitle2">Recent Purchases</Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)} data-cy="btn-cart">
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color="error"
                overlap="rectangular"
                data-cy="badge-count"
              >
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">Cart</Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          purchaseItems={purchaseItems}
          setTotal={setTotal}
        />
      </Drawer>

      <Grid container spacing={3}>
        {cheeseData?.map((item) => (
          <>
            <Grid item key={item.id} xs={12} sm={4}>
              <Item
                item={item}
                setItem={setItem}
                handleOnClick={handleItemDialogOpen}
                handleAddToCart={handleAddToCart}
              />
            </Grid>
          </>
        ))}
      </Grid>
      <ItemDialog
        item={item}
        dialogOpen={itemDialogOpen}
        handleDialogClose={handleItemDialogClose}
      />
      <RecentPurchaseDialog
        recentPurchases={recentPurchases}
        dialogOpen={recentDialogOpen}
        handleDialogClose={handleRecentDialogClose}
      />
    </Wrapper>
  );
};

export default App;
