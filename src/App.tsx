import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState<boolean>(false)
  const [sort, setSort] = useState<boolean>(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toogleColor = () => setShowColor(!showColor)

  const toogleSort = () => setSort(prevState => !prevState)

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => setUsers(originalUsers.current)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async r => await r.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err =>
        console.log(err))
  }, [])

  const filteredUsers = useMemo<User[]>(() => filterCountry !== null && filterCountry.length > 0
    ? users.filter(user => user.location.country.toLocaleLowerCase().includes(filterCountry.toLowerCase()))
    : users
    , [users, filterCountry])

  const sortedUsers = useMemo<User[]>(() => {
    return sort
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : filteredUsers
  }, [filteredUsers, sort])


  return (
    <div className='App'>
      <h1>Users List</h1>
      <header>
        <button onClick={toogleColor}>Color Rows</button>
        <button onClick={toogleSort}>{sort ? 'Do not sort by Country' : 'Sort by Country'}</button>
        <button onClick={handleReset}>Reset State</button>
        <input placeholder='Filter by country' style={{ height: '30px', width: '200px' }} onChange={(e) => setFilterCountry(e.target.value)} />
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColor={showColor} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
