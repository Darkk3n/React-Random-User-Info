import { type User } from '../types'

interface Props {
   users: User[],
   showColor: boolean,
   deleteUser: (email: string) => void
}

export function UsersList({ showColor, users, deleteUser }: Props) {
   return (
      <table width='100%'>
         <thead>
            <tr>
               <th>Picture</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Country</th>
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