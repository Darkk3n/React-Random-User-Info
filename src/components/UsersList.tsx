import { type User } from '../types'

interface Props {
   users: User[],
   showColor: boolean
}

export function UsersList({ showColor, users }: Props) {
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
                  <tr key={index} style={{ backgroundColor: color }}>
                     <td><img src={user.picture.thumbnail} /></td>
                     <td>{user.name.first} </td>
                     <td>{user.name.last}</td>
                     <td>{user.location.country}</td>
                     <td>
                        <button>Delete</button>
                     </td>
                  </tr>
               )
            }))}
         </tbody>
      </table>
   )
}