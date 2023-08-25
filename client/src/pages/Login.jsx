import React, { useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = getAuth();
  const navigation = useNavigate();
  console.log('check auth context in line 10: ', AuthContext);
  const { user } = useContext(AuthContext);

  const handleLoginWithG = async () => {
    const provider = new GoogleAuthProvider();

    const response = await signInWithPopup(auth, provider);
    console.log('check response in line 17', { response });
  };
  if (user?.uid) {
    navigation('/');
    return;
  }
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Welcome to note app
      </Typography>
      <Button variant="outlined" sx={{ width: 200 }} onClick={handleLoginWithG}>
        Login with Google
      </Button>
    </>
  );
};

export default Login;
