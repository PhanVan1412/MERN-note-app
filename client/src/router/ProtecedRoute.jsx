import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function ProtecedRoute({ children }) {
  const navigation = useNavigate();
  if (!localStorage.getItem('accessToken')) {
    navigation('/');
    return;
  }
  return <Outlet />;
}
