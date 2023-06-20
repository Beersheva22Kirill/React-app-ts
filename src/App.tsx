import LifeGame from "./Components/LifeGame";


const App: React.FC = () => {


  return  <div style={ {display:"flex",justifyContent:"center"}}>            
            <div style={{margin:'20px'}}>
                <LifeGame></LifeGame>
            </div>  
          </div>
}

export default App;

