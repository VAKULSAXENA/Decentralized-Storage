
import './App.css';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import React,{useState} from 'react';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

function App() {
  let[start,setStart]=useState(false);
  return (
    <div className="App" style={{marginTop:25}}>
      <button onClick={()=>{
        setStart(true)
      }}>IPFS</button>
      <button onClick={()=>{
        setStart(true)
      }}>FILECOIN</button>
      <button onClick={()=>{
        setStart(true)}}>ARWEAVE</button>
      <button onClick={()=>{
        setStart(true)}}>NFT STORAGE</button>
      {
        start?
      <div>
      <label>
       <p>Upload Image</p>
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
         const file = e.target.files[0]
         console.log(file);
         console.log(client);
         const add = await client.add(file);
         const url=`https://ipfs.infura.io/ipfs/${add.path}`;
         console.log(url);
         setStart(false)
       }}/>
     </label>
     </div>:''
}
      </div>
  
  
  );
}

export default App;
