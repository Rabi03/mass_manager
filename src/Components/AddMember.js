import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import firebaseApp from "../firebase";
import uid from "uuid/dist/v4";

export default function AddMember({ open, handleClose }) {
  const [name, setName] = React.useState("");
  const [reg, setReg] = React.useState(0);
  const [image, setImage] = React.useState("");
  const storageRef = firebaseApp
    .storage()
    .ref()
    .child("images/" + uid() + ".jpg");
  const userRef = firebaseApp.database().ref("users");
  const mealRef=firebaseApp.firestore().collection('meal')

  const uploadImage = (e) => {
    const file = e.target.files[0];
    storageRef.put(file).then(function (result) {
      storageRef.getDownloadURL().then(function (result) {
        setImage(result);
      });
    });
  };

  const addMember = (e) => {
    e.preventDefault();
    if (image === "" || name === "" || reg === "") {
      alert(`Please give all Info ${image} ${name} ${reg}`);
    } else {
      userRef.child(reg).set({
        name: name,
        image: image,
        reg: reg,
      });

      mealRef.doc(reg).set({meal:[]})
    }

    handleClose()
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new member</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="reg"
            label="Registration Number"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setReg(e.target.value)}
          />
          <TextField
            margin="dense"
            id="image"
            type="file"
            fullWidth
            variant="standard"
            onChange={uploadImage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addMember}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
