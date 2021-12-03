import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import firebaseApp from "../firebase";
import firebase from "firebase";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddMoney({ open, handleClose, memberKey, members }) {
  const [member, setMember] = React.useState("");
  const [cost, setCost] = React.useState(0);
  const moneyRef = firebaseApp.database().ref("moneyList");
  const totalRef=firebaseApp.database().ref("titalMoney")

  const addMoney = () => {
    if (member === "" || cost === 0) {
      alert("Please Provide Info");
      handleClose();
      return;
    }

    const m = member.split(",");
    moneyRef
      .child(m[0])
      .get()
      .then((snap) => {
        moneyRef.child(m[0]).set({
          name: m[1],
          add: snap.val() ? snap.val().add + Number(cost) : Number(cost),
        });
      });

      totalRef.get().then(snap=>{
        totalRef.set(snap.val()?snap.val()+Number(cost):Number(cost))
      })

    setCost(0);
    setMember("");
  };

  const handleChange = (event) => {
    setMember(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <div>
          <DialogContentText>Add Member Money</DialogContentText>
          <Box sx={{ minWidth: 120, marginTop: "30px", marginBottom: "30px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Member</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={member}
                label="Member"
                onChange={handleChange}
              >
                {memberKey.map((m) => (
                  <MenuItem value={`${members[m].reg},${members[m].name}`}>
                    {members[m].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCost(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            style={{ marginLeft: "10px" }}
            onClick={() => addMoney()}
          >
            Add Money
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
