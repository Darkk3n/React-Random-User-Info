import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<User[]>([])
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
      <UsersList users={users} />
    </div>
  )
}

export default App
