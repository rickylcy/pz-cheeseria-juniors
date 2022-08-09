import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RecentPurchaseTable from "./RecentPurchaseTable";

type Props = {
  recentPurchases: any;
  dialogOpen: boolean;
  handleDialogClose: () => void;
};

const RecentPurchaseDialog: React.FC<Props> = ({
  recentPurchases,
  dialogOpen,
  handleDialogClose,
}) => (
  <Dialog onClose={() => handleDialogClose()} open={dialogOpen}>
    <DialogTitle>Recent Purchases:</DialogTitle>
    <DialogContent>
      <RecentPurchaseTable recentPurchases={recentPurchases} />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          handleDialogClose();
        }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default RecentPurchaseDialog;
