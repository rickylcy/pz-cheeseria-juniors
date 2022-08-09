import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Types
import { CartItemType } from "../App";
import { toNamespacedPath } from "path";

type Props = {
  cartItems: CartItemType[];
  purchaseItems: (cartItems: CartItemType[]) => void;
  purchaseDialogOpen: boolean;
  handleDialogClose: () => void;
  total: number;
};

const PurchaseDialog: React.FC<Props> = ({
  cartItems,
  purchaseItems,
  purchaseDialogOpen,
  handleDialogClose: handlePurchaseDialogClose,
  total,
}) => (
  <Dialog onClose={() => handlePurchaseDialogClose()} open={purchaseDialogOpen}>
    <DialogTitle>Checkout</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Do you want to checkout with the total amount of ${total}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          handlePurchaseDialogClose();
          purchaseItems(cartItems);
        }}
        data-cy="btn-confirmPurchase"
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default PurchaseDialog;
