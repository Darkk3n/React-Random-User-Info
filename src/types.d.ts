export interface APIResults {
   gender: string
   name: Name
   location: Location
   email: string
   login: Login
   dob: Dob
   registered: Dob
   phone: string
   cell: string
   id: ID
   picture: Picture
   nat: string
}

export interface Dob {
   date: Date
   age: number
}

export interface ID {
   name: string
   value: string
}

export interface Location {
   street: Street
   city: string
   state: string
   country: string
   postcode: number
   coordinates: Coordinates
   timezone: Timezone
}

export interface Coordinates {
   latitude: string
   longitude: string
}

export interface Street {
   number: number;
   name: string;
}