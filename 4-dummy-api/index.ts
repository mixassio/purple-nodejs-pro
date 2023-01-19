import axios from 'axios';

interface IAddress {
  address: string,
  city: string,
  coordinates: {
    lat: number,
    lng: number
  },
  postalCode: number,
  state: number
}

interface IBank {
  cardExpire: string,
  cardNumber: string,
  cardType: string,
  currency: string,
  iban: string
}

interface ICompany {
  address: IAddress,
  department: string,
  name: string,
  title: string
}

enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: Sex,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: Date,
  image: string,
  bloodGroup: string,
  height: number,
  weight: number,
  eyeColor: string,
  hair: {
    color: string,
    type: string
  },
  domain: string,
  ip: string,
  address: IAddress,
  macAddress: string,
  university: string,
  bank: IBank,
  company: ICompany,
  ein: string,
  ssn: string,
  userAgent: string
}

export async function getUsers(url: URL): Promise<IUser[]> {
  try {
    const res = await axios.get(url.href);
    const users: IUser[] = res.data.users;
    return users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Axios error: ' + error.message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong!');
    }
  }
}

getUsers(new URL('https://dummyjson.com/users'));