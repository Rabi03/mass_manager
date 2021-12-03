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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddBazar({ open, handleClose, memberKey, members,bazarUpdate }) {
  const [value, setValue] = React.useState(null);
  const [member, setMember] = React.useState('');
  const [cost,setCost]=React.useState(0)
  const bazarRef=firebaseApp.firestore().collection('bazar');
  const totalRef=firebaseApp.database().ref('totalBazar')

  const addBazar=() => {
      if(member===""||cost===0){
          alert("Please Provide Info");
          handleClose()
          return;
      }

      const m=member.split(',');

    bazarRef.doc('bazarList').update({list:firebase.firestore.FieldValue.arrayUnion({
      date:new Date(value).toLocaleDateString(),
      name:m[1],
      cost:cost
    })}).then(e=>{
        handleClose()
        bazarUpdate()
    })
    totalRef.get().then(snap=>{
      totalRef.set(snap.val()?snap.val()+Number(cost):Number(cost))
    })
  }

  

  const handleChange = (event) => {
    setMember(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <div>
          <DialogContentText>Add a new Bazar</DialogContentText>
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
          <Box sx={{ minWidth: 120,marginTop:'30px',marginBottom:'30px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Member</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={member}
          label="Member"
          onChange={handleChange}
        >
        {memberKey.map(m=><MenuItem value={`${members[m].reg},${members[m].name}`}>{members[m].name}</MenuItem>)}
          
          
        </Select>
      </FormControl>
    </Box>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                      id="outlined-number"
                      label="Cost"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={e=>setCost(e.target.value)}
                    />
                    <Button variant="contained" color="error" style={{marginLeft:'10px'}} onClick={()=>addBazar()}>
                      Add Bazar
                    </Button>
                  </div>
      </DialogContent>
    </Dialog>
  );
}
