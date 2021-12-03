import React ,{useEffect,useState}from "react";
import DataTable from "react-data-table-component";
import {useParams} from 'react-router-dom'
import firebaseApp from "../firebase";
import Button from '@mui/material/Button'

const columns = [
  {
    name: "Date",
    selector: (row) => row.date,
  },
  {
    name: "Meal",
    selector: (row) => row.meal,
  },
];

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
            fontSize: '20px'// override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize: '25px',
            fontWeight: 'bold'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

export default function MealTable() {
  const {reg}=useParams([])
  const [data,setData]=useState([])
  const mealRef=firebaseApp.firestore().collection('meal')
  useEffect(() => {
    if(reg)mealRef.doc(`${reg}`).get().then((snap) =>{
      setData(snap.data().meal)
    })
  },[reg])

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
      }}
    >
    <div style={{display: "flex", flexDirection:'row',justifyContent:'space-between'}}>
    <Button style={{height:'50px'}} variant="contained" color="secondary">Meal List</Button>
    <Button style={{height:'50px'}} variant="contained" color="primary" >Total {data.reduce((total, item) => total + Number(item.meal),0)}</Button>
    </div>
      <DataTable columns={columns} data={data} customStyles={customStyles}/>
    </div>
  );
}
