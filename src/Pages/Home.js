import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <ImageList sx={{ width: 500, height: "auto",marginLeft: "auto", marginRight: "auto",marginTop: 10}}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} style={{margin:5}}>
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
            style={{cursor:'pointer'}}
          />
          </Link>
          
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'images/Add Image.jpg',
    title: 'Members',
    author: '@Rabi Islam',
    rows: 2,
    cols: 2,
    featured: true,
    url:'members'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'More Info',
    author: '@Rabi Islam',
    url:'info'
  },
  {
    img: 'images/shopping.png',
    title: 'Daily Bazar',
    author: '@helloimnik',
    url:'bazar'
  },
  {
    img: 'images/money.jpg',
    title: 'Meal Money',
    author: '@nolanissac',
    cols: 2,
    url:'money'
  },
];
