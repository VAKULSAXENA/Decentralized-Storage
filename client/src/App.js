
import './App.css';

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
