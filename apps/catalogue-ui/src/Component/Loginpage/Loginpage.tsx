import React, { Component } from 'react';
import {
  PublicClientApplication,
  AuthenticationResult,
} from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../Config';
import loginImage from '../../app/assets/loginblank.png';
import logo from '../../app/assets/CirrusLabsLogo.png';
import { json } from 'stream/consumers';
import { getToken } from '../../api/auth';

type LoginpageProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  navigate: any;
};

type LoginpageState = {
  error: any;
  isAuthenticated: boolean;
  user: any;
};

class Loginpage extends Component<LoginpageProps, LoginpageState> {
  private publicClientApplication: PublicClientApplication;

  constructor(props: LoginpageProps) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {},
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.publicClientApplication = new PublicClientApplication({
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
  }

  async componentDidMount() {
    await this.publicClientApplication.initialize();
  }

  async login() {
    try {
      console.log('Attempting to log in...');
      const response: AuthenticationResult = await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      });
  
      const jwtResponse = await getToken({ email: response.account.username });
      console.log(jwtResponse.accessToken);
      localStorage.setItem('jwt_token', jwtResponse.accessToken);
  
      const user = {
        name: response.account.name,
        username: response.account.username,
        role: jwtResponse.role, // Ensure the role is included
      };
  
      sessionStorage.setItem('user', JSON.stringify(user));
  
      this.setState({
        isAuthenticated: true,
        user: user,
      });
      this.props.setIsLoggedIn(true);
      this.props.navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err,
      });
    }
  }
  

  logout() {
    this.publicClientApplication.logout();
    this.setState({ isAuthenticated: false, user: {} });
    this.props.setIsLoggedIn(false);
  }

  render() {
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
        {/* Header with logo */}
        <header className="absolute top-0 left-0 w-full p-0 m-0">
          <img src={logo} alt="Cirrus Labs Logo" className="h-16 mb-2 ml-4" />
          <hr className="absolute left-0 right-0 border-brown-600 border-t-3 m-0 p-0" />
        </header>

        <div className="absolute inset-0 flex items-center justify-start pl-16">
          <div className="">
            <h1 className="text-6xl font-normal mb-4">Project Catalogue</h1>
            <p className="mb-6 ml-3 text-2xl">
              The one stop integrated platform for all the POC's across
              CirrusLabs
            </p>
            {this.state.isAuthenticated ? (
              <button
                onClick={this.logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={this.login}
                className="text-2l w-70 ml-3 bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-10 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function LoginpageWithNavigate(props: any) {
  const navigate = useNavigate();
  return <Loginpage {...props} navigate={navigate} />;
}

export default LoginpageWithNavigate;
