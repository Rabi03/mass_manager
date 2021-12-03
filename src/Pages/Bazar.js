import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import firebaseApp from "../firebase";
import { Link } from "react-router-dom";
import BazarBar from "../Components/BazarBar";
import AddBazar from "../Components/AddBazar";

export default function Bazar() {
    const [members, setMembers] = useState([]);
  const [bazar, setBazar] = useState([]);
  const [open, setOpen] = useState(false);
  const bazarRef=firebaseApp.firestore().collection('bazar')


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBazarUpdate=()=>{
    bazarRef.doc('bazarList').get().then((snap) =>{
        setBazar(snap.data().list)
    })
  }

  useEffect(() => {
    firebaseApp
    .database()
    .ref("users")
    .on("value", (snap) => setMembers(snap.val()));

    getBazarUpdate()
  }, []);

  const memberKeys = members ? Object.keys(members) : [];


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
      <BazarBar onClick={handleClickOpen} />
      <div>
        <AddBazar open={open} handleClose={handleClose} memberKey={memberKeys} members={members} bazarUpdate={getBazarUpdate} />
      </div>
      <div>
        <List>
        {bazar.map((b) => (
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                  <Button variant="contained" color='success'>{b.date}</Button>
              
              }
            >
              <ListItemText
                primary={`${b.name}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline",backgroundColor:'black',color:'white',padding:'2px 5px' }}
                      component="span"
                      variant="body2"
                    >
                      {b.cost} tk
                    </Typography>
                  </React.Fragment>
                }
                />
            </ListItem>
        ))}
      </List>
      </div>
      
    </div>
  )
}
