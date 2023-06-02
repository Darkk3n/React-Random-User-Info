import { SortBy, type User } from '../types.d'

interface Props {
   users: User[],
   showColor: boolean,
   deleteUser: (email: string) => void,
   changeSorting: (sort: SortBy) => void
}

export function UsersList({ showColor, users, deleteUser, changeSorting }: Props) {
   return (
      <table width='100%'>
         <thead>
            <tr>
               <th>Picture</th>
               <th className='pointer' onClick={() => changeSorting(SortBy.NAME)}>First Name</th>
               <th className='pointer' onClick={() => changeSorting(SortBy.LAST)}>Last Name</th>
               <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>Country</th>
               <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            {(users.map((user, index) => {
               const backgroundColor = index % 2 === 0 ? '#333' : '#555'
               const color = showColor ? backgroundColor : 'transparent'
               return (
                  <tr key={user.email} style={{ backgroundColor: color }}>
                     <td><img src={user.picture.thumbnail} /></td>
                     <td>{user.name.first} </td>
                     <td>{user.name.last}</td>
                     <td>{user.location.country}</td>
                     <td>
                        <button onClick={() => deleteUser(user.email)}>Delete</button>
                     </td>
                  </tr>
               )
            }))}
         </tbody>
      </table>
   )
}