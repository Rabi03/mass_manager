import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import firebaseApp from '../firebase'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";


export default function Info() {
    const [totalBazar,setTotalBazar]=React.useState(0)
    const [shopCost,setShopCost]=React.useState(0)
    const [sCost,setSCost]=React.useState(0)
    const [open,setOpen]=React.useState(0)
    const [totalMoney,setTotalMoney]=React.useState(0)
    const totalMRef=firebaseApp.database().ref("titalMoney")
    const totalBRef=firebaseApp.database().ref('totalBazar')
    React.useEffect(() => {
        totalMRef.get().then(snap=>{
            setTotalMoney(snap.val()?snap.val():0)
        })
        totalBRef.get().then(snap=>{
            setTotalBazar(snap.val()?snap.val():0)
        })

        firebaseApp.database().ref('shop').get().then((snap) =>{
          setSCost(snap.val()?snap.val():0)
        })

        firebaseApp.database().ref('shop').on('child_changed',snap=>{
          firebaseApp.database().ref('shop').get().then((snap) =>{
            setSCost(snap.val()?snap.val():0)
          })
        })



    },[])
    const addShopCost=() => {
      firebaseApp.database().ref('shop').get().then((snap) =>{
        firebaseApp.database().ref('shop').set(snap.val()?snap.val()+Number(shopCost):Number(shopCost))
      })

      setOpen(false)

    }
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        bgcolor: "background.paper",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 100,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275,backgroundColor:'rgba(0,0,0,0.2)' }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Fund
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" style={{fontSize:'20px'}}>{totalMoney} tk</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275,backgroundColor:'rgba(0,0,0,0.2)' }}>
              <CardContent>
              <div style={{display: 'flex',flexDirection:'row', justifyContent:'space-between'}}>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Shop Expences
                </Typography>
                {!open&&<Button style={{height:'50px'}} variant="contained" color="secondary" onClick={()=>setOpen(true)}>Add</Button>}
              </div>
                
              </CardContent>
              <CardActions>
                {open?
                <List style={{width:'400px'}}>
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
                      onChange={e=>setShopCost(e.target.value)}
                    />
                    <Button variant="contained" color="error" style={{marginLeft:'10px'}} onClick={addShopCost}>
                      Add
                    </Button>
                  </div>
                }

                style={{marginBottom:'20px'}}
              >
              </ListItem>
                </List>
                :
                <Button size="small"  style={{fontSize:'20px'}}>{sCost} tk</Button>
                }
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275,backgroundColor:'rgba(0,0,0,0.2)' }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Bazar
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{fontSize:'20px'}}>{totalBazar} tk</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 ,backgroundColor:'rgba(0,0,0,0.2)'}}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Available Fund (wihout Shop expences)
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{fontSize:'20px'}}>{totalMoney-totalBazar} tk</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
