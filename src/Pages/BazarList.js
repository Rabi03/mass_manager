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
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Cost",
    selector: (row) => row.cost,
  },
];

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
            fontSize: '20px',
            padding:'0px 25px'
        },
    },
    headCells: {
        style: {
            paddingLeft: '25px', // override the cell padding for head cells
            paddingRight: '25px',
            fontSize: '25px',
            fontWeight: 'bold',
            width: '200px'
        },
    },
    cells: {
        style: {
            paddingLeft: '25px', // override the cell padding for data cells
            paddingRight: '25px',
            width: '200px'
        },
    },
};

export default function BazarList() {
    const [bazar, setBazar] = useState([]);
  const bazarRef=firebaseApp.firestore().collection('bazar')
  useEffect(() => {
    bazarRef.doc('bazarList').get().then((snap) =>{
        setBazar(snap.data().list)
    })
  },[])

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 760,
        bgcolor: "background.paper",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
      }}
    >
        <div style={{display: "flex", flexDirection:'row',justifyContent:'space-between'}}>
    <Button style={{height:'50px'}} variant="contained" color="secondary">Bazar List</Button>
    <Button style={{height:'50px'}} variant="contained" color="primary" >Total {bazar.reduce((total, item) => total + Number(item.cost),0)}</Button>
    </div>
      <DataTable columns={columns} data={bazar} customStyles={customStyles}/>
    </div>
  );
}
