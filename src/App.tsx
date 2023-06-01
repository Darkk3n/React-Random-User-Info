import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async r => await r.json())
      .then(res => { setUsers(res.results) })
      .catch(err =>
        console.log(err))
  }, [])


  return (
    <div className='App'>
      <h1>Tech Assestment</h1>
      {
        JSON.stringify(users)
      }
    </div>
  )
}

export default App
