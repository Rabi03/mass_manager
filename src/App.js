import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Bazar from './Pages/Bazar'
import BazarList from './Pages/BazarList'
import Home from './Pages/Home'
import MealTable from './Pages/MealTable'
import Members from './Pages/Members'
import Money from './Pages/Money'
import firebaseApp from './firebase'
import firebase from 'firebase'
import Info from './Pages/Info'

export default function App() {
    // const bazarRef=firebaseApp.firestore().collection('bazar')
    // useEffect(() => {
    //     bazarRef.doc('bazarList').set({list:[]})
    //     bazarRef.doc('bazarUpdate').set({list:[]})

    // },[])
    return (
        <div style={{flex:'1'}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/bazar" element={<Bazar />} />
                    <Route path="/money" element={<Money />} />
                    <Route path="/bazarList" element={<BazarList />} />
                    <Route path="/member/:reg" element={<MealTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
