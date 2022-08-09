import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Types
import { CartItemType } from '../../App';

type Props = {
    item:CartItemType;
    dialogOpen: boolean;
    handleDialogClose: () => void;
}
  
const ItemDialog: React.FC<Props> = ({ item, dialogOpen, handleDialogClose}) => (
    <Dialog onClose={() => handleDialogClose()} open={dialogOpen}>
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Price: ${item.price}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          Description: {item.description}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          Category: {item.category}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
    </Dialog>
)

export default ItemDialog;