import { useEffect } from "react"

const A: React.FC = () => {
    useEffect(() => {
        console.log('mounting of A')
        return () => {
            console.log('unmounting of A')
        }
    })
    return<div>
        <p style={{fontSize:'2em',color:'lightgreen', fontWeight:"bold"}}>Component A</p>
    </div>
}

export default A;