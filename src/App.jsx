import { useContext } from "react"
import { AuthContext } from "./context"
import { fetchUser } from "./api"


function App() {
  const { auth } = useContext(AuthContext)
  
  const submit = () => {
    fetchUser({ auth })
  }

  return (
    <div className='p-5'>
      <button onClick={() => submit()}>Fetch Profile</button>
    </div>
  )
}


export default App
