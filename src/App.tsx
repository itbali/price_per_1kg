import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {store} from "./redux/redux";

function App() {
  const state= useSelector(store=>store)
  const dispatch = useDispatch()



  return (


    <div className="App">

    </div>
  );
}

export default App;
