
import './App.css';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import React,{useState} from 'react';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

function App() {
  let[start,setStart]=useState('');
  return (
    <div className="App" style={{marginTop:25}}>
      <button onClick={()=>{
        setStart('ipfs')
      }}>IPFS</button>
      <button onClick={()=>{
        setStart('filecoin')
      }}>FILECOIN</button>
      <button onClick={()=>{
        setStart('arweave')}}>ARWEAVE</button>
      <button onClick={()=>{
        setStart('nftstorage')}}>NFT STORAGE</button>
      {
        start==='ipfs'?
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
     </div>:start==='filecoin'?
     <div>
     <p>Upload Image</p>
     </div>:start==='arweave'?
      <div>
      <p>Upload Image</p>
      </div>:
       <div>
       {/* <p>Upload Image</p> */}
       </div>

}
      </div>
  
  
  );
}

export default App;
