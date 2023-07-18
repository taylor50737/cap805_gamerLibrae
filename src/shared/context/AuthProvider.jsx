import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState({
    userName: '',
    userId: '',
    loggedIn: false,
    admin: false,
    affiliation: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchAuthMe = async () => {
    setLoading(true);
    console.log('fetch auth me called');
    const authMeResponse = await fetch('http://localhost:8080/api/auth/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let ac;
    if (authMeResponse.status != 200) {
      ac = {
        loggedIn: false,
        userName: '',
        userId: '',
        admin: false,
        affiliation: false,
      };
    } else {
      ac = await authMeResponse.json();
      // ac.affiliation = !!ac.affiliation; // force object to boolean since we don't need the detail
    }
    console.log(ac);
    // TODO: delete this! delay for test purpose only
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1500);

    setAccountInfo(ac);
    setLoading(false);
    return ac;
  };

  const handleRegister = async ({ userName, email, password }) => {
    const registerResponse = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: userName, email: email, password: password }),
    });
    if (registerResponse.status === 200) {
      console.log('register in success');
    }
  };

  const handleLogin = async ({ email, password }) => {
    const loginResponse = await fetch('http://localhost:8080/api/auth/session', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    console.log(loginResponse);
    if (loginResponse.status === 200) {
      console.log('log in success');
      fetchAuthMe();
      redirect('/');
    }
  };

  const handleLogout = async () => {
    const logOutResponse = await fetch('http://localhost:8080/api/auth/session', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(logOutResponse);
    fetchAuthMe();
  };

  // Force auth me when refresh page
  useEffect(() => {
    fetchAuthMe();
  }, []);

  const value = {
    ...accountInfo,
    loading: loading,
    handleRegister: handleRegister,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
