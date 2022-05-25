
import './App.css';
import Arweave from 'arweave';
import {create as ipfsHttpClient} from 'ipfs-http-client';
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
         const file = e.target.files[0]
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
         const image = URL.createObjectURL(file)
         console.log(file);
         const transaction = await arweave.createTransaction({
          data:image

         });

         transaction.addTag('Content-Type','image/jpg');

        await arweave.transactions.sign(transaction,{"d":"IIKTZS8yDwgMkXFVC6dVJXu8N9j2QbGVgmZGviYTb159syfSP_LJhkyODz-Wz4KzVz7rKbZ9Ytnp-UDllxgeSp7joD1LY55j3TaZg1n0cZKRdwQNNwbYjc44OnmLAiOdsGgoN1tYmsb4W7kjMJbnUXBw-sh04mDMeJJRfMaTgE1ZdjL9FT5yMDnEB2cF7edri58Qyh3aqSuOtzRtA2T20Qzp0BHVt70kWsaf30h1LVPchiTItOYJHmETvppQ525B_f4Ir0sG9zDSZNcX6-oajM5rLel6vnx0R2rZX4NKNN63XnNlT0_lTy1uMauPGhWHQahtAyCHOdTFdc4gSlWRc-S1-qJSmQIvABpc43fO9Wp6gTc2tBWNa4sH_Qj5102Q0h5-hao7t0mqQF0eKgJhSpqo3pUOfDNvmJ3r59pzbWtOQCSG_rBgaBOXI4pNi9nFKYQBtMkvLzvuGButhAAMLu_MSU-hMrMGlp0lFGbnXi4XpQ69KYc1FqxJ38IgbPGIkOIM2U9kTljYeGg7OwgqyQchcalUQbyLCLU1Jnv_9mTqI1xEYNPv5rb9XYLeTectnolrmMSBHtC2kWDbywbLnrcxklduHDIdzHgz2MAkLq6ro1p7pfU-F3WsftAbpfhKtbhFDo3IeCuip3QUtVhYCXG6oXLeL6iUcS2KgsXEbdE","dp":"20JRUeODVRJN91uYvlybwQsV0k6c1p8IJQOObCcWgE2bZatDSWpAKl7V_Ta8npyoJRR2GXBzdLz6_8t-YB4g-x8jTeGYOPlk3_wez-NxVJoTfMkAY2cerHRBwU_HJbUWQn42o_YmMMONbUTXHxreryL0T1-TZNjLhgb0BvlDmMwczuRqA5k7LBBP4R3qi2HkI2xw3rP6wmULtL2stfqkrX5-EWYsLrpHsHfdnOGMB2BqpQrCuAYbejzpn7HdiDhUoWM-tySAD0urHrHYFmBdgvB3byEIg8vH0D2ADY4Q41ro1uC1i4gacJb9StP595DKa5-NmL2FUtMJ8vUMsFGnQQ","dq":"Ed-yGqic9bEV00cWtClAEAIc5_wKcB-Mt5-vyQguLZForMmUm7jaerLXRnYqKVilgr7sR963RQayNcsGHjgW6pH_fXOeL6QbG2QhtYFMgGvG_5zuOxVzWmLdQfkU7AIr4dxtDoB9CweqQHnTr3yIzUhCBwy4yt-D7GzRxkD-M6-Abmh95wR2Jevx63mWaBgNlKwytblJ0wcnagHucVoVFEdLU2XZEYGgpgtdzPExHCIeXrqeRrBW0wguREEwXDBUrE4ZFV8vGwCGrEkEHdtSPGBNbrFlHX43trJgzxN79tFmMrYXB5cu1d-va0kWJYLmtMf-3zvhBfWHPaIZD1nmHQ","e":"AQAB","ext":true,"kty":"RSA","n":"mdW1GXHPGJ9Sk3YoPSa4QtqCaeWR9bhXnNlj22rUEoT0daiigUHwtyzsEiUBbNLEezeuPVKbEQdyGnKm3wUEJ23fOw3bH5DwprHwI9lBF07oaDPVLLHhQUyF-6uq5RlkvKRxaEb6FmT6sIKyb-cCHQ1Q6FSTVLlCh6X8NmrXWhsE1ZtJiF1Lpd9TTzQvjq68OIjcfv7LYJAr0hILTwk-60GYqDIWSJVGypAl9sOj--D7RKw_UcktcNQVuyFyTIHbL1sZt4nR1ORXMzo853Q8A9zOgbG3BodHO-iA1qVGy7VBkKGLKKZKlVNQKniaL1R-24HXn4sUCwQqCu9K3iKZATewgg_sMf7_TAd1DO-Um5Y8-Aizuy8xzirqVJEicvUMotHy4u8lMK9bMbwjND1uCNej1-4p5kscmPrqi1kyasc8guMdLhDSrkRRmMelPv4UC4twwUVpW_-xUz-d_bcf7-FoRWfNRM520H0q4hyEKBgrjWPTLjiYNCfsiCg7A92k2KTcYC2atiiNRvXk8AmIucn4UXijZ3OUStz0wLtAGJs3P533GQ-5YQJGm715og5Ur5THWijlXIR_OoXxfnSKderjhk8d8zdzekyo4mouyv23_DWBHyv3JnDr5a5g8w50EBx21hRHpK5cMJzoka2xXk8_UtA0F_10nKTEzMMrvm8","p":"9HJ3qCfy3jr2Jc68zaVAptdEjXeig4kfX4LNV5w7QlolSt0zGE6jshg_8q1VhOr8hgwaZi18m7vsMnnKZdrvhsJlpf8NE3KK6SZRb-n8nuraVWkz5SL84UjOe4wXXcVzxQBjXxj9PjIpLwsHQ4cHJpv0yrZuY_j2zBmdrJUoobkpOmVr5dCc8JTQ-ReaK4ijWa3eC5Z6UGiUY4rOeWmcHbJtmrSY07ZgnyT9uKUteC40s3JOnB53A0-6uXcjgqxfJ2cgBx8J11vP93xn_yGITmE_RECgJJmfaGbqufbvWlrqDxebBN4F0josLy2XQNkgu8IYfk5zLjvFN5luZQbuYw","q":"oRrvAcAeXD9bqP9CjXcwLJR4fIe1OSSKaQFsOHkWxV0Qcv_fg2ny9Qa5T_A_o7ZNygFxyUA5l4AYqb9su2LerlBG9e8oW59YG9u0Jf13GZs2ljJFpIR4IAwZYSbdx9iQEuHt3XrTcch8gHFgaVnlqF5ViC1XwpuCF8GwL2rfmNQ9eHr1Yo-e6Kj-m0BkVSZmn2ppw18C7vVY8Sd8A4oRMcM3aDkN0Gw8Z--EW-3DjwY_5db7gQ9wd_R_VCn9cW4ygtyGDgW4dpGcP4FDmHe2MU-HaURVKkMCQBUbjIbieIfwpy3wExclmsJTRElstZI6XUGmwT_7jtwYMZ7ZbW0XhQ","qi":"AnRe7IDUXd_LskvVfAWOFBO8rZQDDZAy12qY2jFTV12oZSlLu3JSyOWlpIeBLbiIdMLCeI3luwbJC-29IsTsy8kAxiphZPH1i8MPszcGGjB8zdyWssSfIx_0fsoWNHI7k5IuCAbDmMGlRlGFa97Vj6h5fu78qEjdv-FofPvLvelg6KioTjneK_-EaDCUcELAjRa5jXdXxQKU1wRwCLD_IiC4EeR84ssWdeZg1IEJczq8dSRe0218qq1k309krvafvh58Em6lnPpiTJzrSWKQBil8tfxoMQz4ucq5JOIyNbFlMB4L-ChfnvGQ9OmPsNikE-aE6pGj_kSvvOPB3fmbXw"});
        const response = await arweave.transactions.post(transaction);
        console.log(response);
         const url = `https://arweave.net/${transaction.id}`;
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
