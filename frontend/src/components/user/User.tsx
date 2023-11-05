import React from 'react';
import { IUser } from '../../interfaces/user';

interface UserProps {
  user: IUser;
}

export default function User(props: UserProps) {
  const { user } = props;
  return <h1>{user.name}</h1>;
}
