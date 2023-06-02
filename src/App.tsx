import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { UsersList } from './components/UsersList';
import { SortBy, type User } from './types.d';

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState<boolean>(false)
  const [sort, setSort] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toogleColor = () => setShowColor(!showColor)

  const toogleSort = () => {
    const newSorting = sort === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSort(newSorting)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => setUsers(originalUsers.current)

  const handleChangeSort = (sort: SortBy) => {
    setSort(sort)
  }

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
    if (sort === SortBy.NONE) {
      return filteredUsers
    }

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sort]
      return extractProperty(a).localeCompare(b)
    })
    // let sortedFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    // if (sort === SortBy.NAME) {
    //   sortedFn = (a: User, b: User) => a.name.first.localeCompare(b.name.first)
    // }

    // if (sort === SortBy.LAST) {
    //   sortedFn = (a: User, b: User) => a.name.last.localeCompare(b.name.last)
    // }
    // return filteredUsers.toSorted(sortedFn)
  }, [filteredUsers, sort])


  return (
    <div className='App'>
      <h1>Users List</h1>
      <header>
        <button onClick={toogleColor}>Color Rows</button>
        <button onClick={toogleSort}>{sort === SortBy.COUNTRY ? 'Do not sort by Country' : 'Sort by Country'}</button>
        <button onClick={handleReset}>Reset State</button>
        <input placeholder='Filter by country' style={{ height: '30px', width: '200px' }} onChange={(e) => setFilterCountry(e.target.value)} />
      </header>
      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColor={showColor} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
