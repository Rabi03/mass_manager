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
import firebaseApp from '../firebase'
import firebase from "firebase"

export default function AddMeal({ open, handleClose, memberKey, members }) {
  const [value, setValue] = React.useState(null);
  const [meal, setMeal] = React.useState(0);
  const mRef=firebaseApp.firestore().collection('meal');

  const addMeal=(m,meal) => {
    mRef.doc(m).update({meal:firebase.firestore.FieldValue.arrayUnion({
      date:new Date(value).toLocaleDateString(),
      meal:meal
    })})
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <div>
          <DialogContentText>Add a new member</DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <List style={{width:'500px',marginTop:30}}>
          {memberKey.map((m) => (
            <>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                      id="outlined-number"
                      label="Number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={e=>setMeal(e.target.value)}
                    />
                    <Button variant="contained" color="error" style={{marginLeft:'10px'}} onClick={()=>addMeal(m,meal)}>
                      Add Meal
                    </Button>
                  </div>
                }

                style={{marginBottom:'20px'}}
              >
                <ListItemText primary={`${members[m].name}`} />
              </ListItem>
             
            </>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => {}}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
