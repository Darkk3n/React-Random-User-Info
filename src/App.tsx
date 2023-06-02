import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState<boolean>(false)
  const [sort, setSort] = useState<boolean>(false)

  const toogleColor = () => {
    setShowColor(!showColor)
  }

  const toogleSort = () => {
    setSort(prevState => !prevState)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async r => await r.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err =>
        console.log(err))
  }, [])

  const sortedUsers = sort
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  return (
    <div className='App'>
      <h1>Users List</h1>
      <header>
        <button onClick={toogleColor}>Color Rows</button>
        <button onClick={toogleSort}>{sort ? 'Do not sort by Country' : 'Sort by Country'}</button>
      </header>
      <main>
        <UsersList showColor={showColor} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
