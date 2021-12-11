import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import firebaseApp from "../firebase";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [totalBazar, setTotalBazar] = React.useState(0);
  const [sCost, setSCost] = React.useState(0);
  const [totalMeal, setTotalMeal] = React.useState(0);
  const mealRef = firebaseApp.firestore().collection("meal");
  const totalBRef = firebaseApp.database().ref("totalBazar");
  React.useEffect(() => {
    setTotalMeal(0);
    setTotalBazar(0);
    setSCost(0);
    mealRef.get().then((snap) => {
      snap.forEach((meal) =>
        setTotalMeal(
          (m) =>
            m +
            meal
              .data()
              .meal.reduce((total, item) => total + Number(item.meal), 0)
        )
      );
    });

    totalBRef.get().then((snap) => {
      setTotalBazar(snap.val() ? snap.val() : 0);
    });

    firebaseApp
      .database()
      .ref("shop")
      .get()
      .then((snap) => {
        setSCost(snap.val() ? snap.val() : 0);
      });
  }, []);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <Grid
        item
        xs={6}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
        }}
      >
        <Card sx={{ minWidth: 200, backgroundColor: "rgba(0,0,0,0.2)" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              Meal Rate
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" style={{ fontSize: "20px" }}>
              {(totalBazar + sCost) / totalMeal}
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Box style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 200, backgroundColor: "rgba(0,0,0,0.2)" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Expance
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" style={{ fontSize: "20px" }}>
                  {totalBazar + sCost} tk
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 200, backgroundColor: "rgba(0,0,0,0.2)" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Meal
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" style={{ fontSize: "20px" }}>
                  {totalMeal}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ImageList
        sx={{
          width: 500,
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
        }}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} style={{ margin: 5 }}>
            <img
              src={item.img}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <Link to={`/${item.url}`}>
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: "images/Add Image.jpg",
    title: "Members",
    author: "@Rabi Islam",
    rows: 2,
    cols: 2,
    featured: true,
    url: "members",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "More Info",
    author: "@Rabi Islam",
    url: "info",
  },
  {
    img: "images/shopping.png",
    title: "Daily Bazar",
    author: "@helloimnik",
    url: "bazar",
  },
  {
    img: "images/money.jpg",
    title: "Meal Money",
    author: "@nolanissac",
    cols: 2,
    url: "money",
  },
];
