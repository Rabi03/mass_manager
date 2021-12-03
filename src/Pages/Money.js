import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import firebaseApp from "../firebase";
import AddMoney from "../Components/AddMoney";
import MoneyBar from "../Components/MoneyBar";

export default function Money() {
    const [members, setMembers] = useState([]);
  const [money, setMoney] = useState([]);
  const [open, setOpen] = useState(false);
  const moneyRef=firebaseApp.database().ref('moneyList')


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMoney=()=>{
    moneyRef.on('value',snap=>setMoney(snap.val()))
  }

  useEffect(() => {
    firebaseApp
    .database()
    .ref("users")
    .on("value", (snap) => setMembers(snap.val()));

    getMoney()
  }, []);

  const memberKeys = members ? Object.keys(members) : [];
  const moneyKeys = money ? Object.keys(money) : [];


  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 100,
      }}
    >
      <MoneyBar onClick={handleClickOpen} />
      <div>
        <AddMoney open={open} handleClose={handleClose} memberKey={memberKeys} members={members} />
      </div>
      <div>
        <List>
        {moneyKeys.map((my) => (
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                  <Button variant="contained" color='success'>{money[my].add} tk</Button>
              
              }
            >
              <ListItemText
                primary={`${money[my].name}`}
                />
            </ListItem>
        ))}
      </List>
      </div>
      
    </div>
  )
}
