import React, { useState, useEffect } from 'react';
import { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../Config';
import loginImage from '../../app/assets/loginblank.png';
import logo from '../../app/assets/CirrusLabsLogo.png';
import { getToken } from '../../api/auth';

const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});

const Loginpage: React.FC<{ setIsLoggedIn: (isLoggedIn: boolean, role: string) => void }> = ({ setIsLoggedIn }) => {
  const [error, setError] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the MSAL client
    const initializeMsal = async () => {
      await publicClientApplication.initialize();
    };
    initializeMsal();
  }, []);

  const login = async () => {
    try {
      console.log('Attempting to log in...');
      const response: AuthenticationResult = await publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      });

      const jwtResponse = await getToken({ email: response.account.username, name: response.account.name });
      console.log(jwtResponse.accessToken);
      localStorage.setItem('jwt_token', jwtResponse.accessToken);

      const user = {
        name: response.account.name,
        username: response.account.username,
        role: jwtResponse.role, // Ensure the role is included
      };

      sessionStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true);
      setUser(user);
      setIsLoggedIn(true, user.role);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setIsAuthenticated(false);
      setUser({});
      setError(err);
    }
  };

  const logout = () => {
    publicClientApplication.logout();
    setIsAuthenticated(false);
    setUser({});
    setIsLoggedIn(false, '');
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user');
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '0',
        margin: '0',
        boxSizing: 'border-box',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-start pl-16">
        <div>
          <h1 className="text-6xl font-normal mb-4">Project Catalogue</h1>
          <p className="mb-6 ml-3 text-2xl">
            The one stop integrated platform for all the POC's across CirrusLabs
          </p>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={login}
              className="text-2l w-70 ml-3 bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-10 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
