
import './App.css';
import Arweave from 'arweave';
import { providers } from "ethers";
import {WebBundlr } from "@bundlr-network/client";
import {create as ipfsHttpClient} from 'ipfs-http-client';
import {NFTStorage,File} from 'nft.storage';
//import {init,requestSignIn} from "@textile/eth-storage";
import {Web3Storage} from 'web3.storage';
import fs from 'fs';
import React,{useState} from 'react';
import nftmeta from './nftmeta.json';
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
         const file = e.target.files[0];
         console.log(file);
         console.log(client);
         const add = await client.add(file);
         const add2 = await client.add(JSON.stringify(nftmeta));
         console.log(add);
         console.log(add2);
         const url=`https://ipfs.infura.io/ipfs/${add.path}`;
         const url2=`https://ipfs.infura.io/ipfs/${add2.path}`;
         console.log(url);
         console.log(url2);
         setStart(false)
       }}/>
     </label>
     </div>:start==='filecoin'?
     <div>
      <label>
       <p>Upload Image on FILECOIN</p>  {/* FILECOIN */}
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
         const storage = new Web3Storage({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZlNTU3NDFGOTE5NDEyMjM4MTQ0ODBGMjViRTJGQmVkYjc0YURhOEEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTQxNjU1MjMwNDEsIm5hbWUiOiJkZW1vIn0.lWmqCWz3T_2VDhtP9oQBDEbK8x6q1Rtb2jUi5SGEx2U'});
        
         const file = e.target.files[0];
          const cid = await storage.put(file);
          console.log(cid);

        
       }}
         />
         </label>
     </div>:start==='arweave'?
      <div>
      <label>
       <p>Upload Image on ARWEAVE</p>   {/* ARWEAVE */}
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
        await window.ethereum.enable()
        const provider = new providers.Web3Provider(window.ethereum);
        await provider._ready()
        const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
        await bundlr.ready();
        let file = e.target.files[0];
        const image=URL.createObjectURL(file);
        let reader = new FileReader();
        reader.onload = function(){
          if(reader.result) {
            file= Buffer.from(reader.result);
          }
        }
        reader.readAsArrayBuffer(file);
        let tx = await bundlr.uploader.upload(file,[{name:"Content-Type",value:"image/png"}]);
        const uri = `http://arweave.net/${tx.data.id}`;
        console.log(uri);

       

 

        
        }} />
         </label>
      </div>:
       <div>
        <label>
       <p>Upload Image on NFTSTORAGE</p>    {/* NFTSTORAGE */}
       <input placeholder='Upload' type='file'
       onChange={async(e)=>{
         const file = e.target.files[0];
         const client = new NFTStorage({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZBODY4MDA2Qzg0NTIzMDgyNzg1M0Y4RjY0NmUzMzIzOUUxRjY4OTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDA2OTIzNTc2MiwibmFtZSI6ImRlbW8ifQ.M7DgwshnpGyl_NUQyA-Od0XfjkZbtSrJdrHreLGrsUk"});
        const metadata = await client.store({
          name:'mario',
          description:'mariolead',
          image: new File([file],'mario.png',{type:'image/png'})
        })
         console.log(metadata.url);
       }}
         />
         </label>
       </div>

}
      </div>
  
  
  );
}

export default App;
