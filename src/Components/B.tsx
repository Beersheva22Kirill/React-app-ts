import { useEffect } from "react"

const B: React.FC = () => {
    
    useEffect(() => {
        console.log('mounting of B')
        return () => {
            console.log('unmounting of B')
        }
    })
    return<div>
        <p style={{fontSize:'2em',color:'lightcyan', fontWeight:"bold"}}>Component B</p>
    </div>
}

export default B;