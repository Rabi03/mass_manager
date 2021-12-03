import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddMember from "../Components/AddMember";
import ButtonAppBar from "../Components/AppBar";

import firebaseApp from "../firebase";
import { Link } from "react-router-dom";
import AddMeal from "../Components/AddMeal";

export default function AlignItemsList() {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMeal,setOpenMeal]=useState(false)

  const handleMealOpen = () => {
    setOpenMeal(true);
  };

  const handleMealClose = () => {
    setOpenMeal(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    firebaseApp
      .database()
      .ref("users")
      .on("value", (snap) => setMembers(snap.val()));
  }, []);

  const memberKeys = members ? Object.keys(members) : [];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 460,
        bgcolor: "background.paper",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 100,
      }}
    >
      <ButtonAppBar onClick={handleClickOpen} onMeal={handleMealOpen} />
      <div>
        <AddMember open={open} handleClose={handleClose} />
      <AddMeal open={openMeal} handleClose={handleMealClose} memberKey={memberKeys} members={members} />
      </div>
      <div>
        <List>
        {memberKeys.map((m) => (
          <>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Link to={`/member/${m}`} style={{textDecoration:'none'}}>
                  <Button variant="contained" color='error'>Meal List</Button>
                </Link>
              
              }
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={members[m].image} />
              </ListItemAvatar>
              <ListItemText
                primary={`${members[m].name}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {members[m].reg}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
      </div>
      
    </div>
  );
}
