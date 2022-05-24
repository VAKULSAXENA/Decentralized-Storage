
import './App.css';
import Arweave from 'arweave';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import React,{useState} from 'react';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const arweave = Arweave.init({host:'arweave.net',port:443,protocol:'https',timeout:20000,logging:false});


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
       <p>Upload Image on IPFS</p>    {/* IPFS */}
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
      <label>
       <p>Upload Image on FILECOIN</p>  {/* FILECOIN */}
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
         const file = e.target.files[0]
        
       }}
         />
         </label>
     </div>:start==='arweave'?
      <div>
      <label>
       <p>Upload Image on ARWEAVE</p>   {/* ARWEAVE */}
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
         const file = e.target.files[0]
         const transaction = await arweave.createTransaction({
          data:file

         })
         await arweave.transactions.sign(transaction,"Arweave WALLET JSON without ext:true");
         const response=await arweave.transactions.post(transaction);
         console.log(response);
         const url = transaction.id?`https://arweave.net/${transaction.id}`:undefined;
         console.log(url);
        }}
         />
         </label>
      </div>:
       <div>
        <label>
       <p>Upload Image on NFTSTORAGE</p>    {/* NFTSTORAGE */}
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
         const file = e.target.files[0]

         
       }}
         />
         </label>
       </div>

}
      </div>
  
  
  );
}

export default App;
