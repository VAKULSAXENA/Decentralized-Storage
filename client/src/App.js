
import './App.css';
import {create as ipfsHttpClient} from 'ipfs-http-client';

const client = ipfsHttpClient('');
function App() {
  return (
    <div className="App">
     <label>
       <p>Upload Image</p>
       <input placeholder='Upload' type='file'
       onChange={(e)=>{
         const file = e.target.files[0]
         console.log(file);
       }}/>
     </label>
    </div>
  );
}

export default App;
