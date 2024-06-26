import React, { Component } from 'react';
import { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../Config'; 
import loginImage from '../../app/assets/login1.jpg';

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
      user: {}
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }

  async componentDidMount() {
    await this.publicClientApplication.initialize();
  }

  async login() {
    try {
      console.log("Attempting to log in...");
      const response: AuthenticationResult = await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account"
      });
      console.log("Login successful:", response);
      this.setState({
        isAuthenticated: true,
        user: response.account
      });
      this.props.setIsLoggedIn(true);
      this.props.navigate('/home');
    } catch (err) {
      console.error("Login error:", err);
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err
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
      <div className="h-screen flex">
        {/* Left side with login image */}
        <div className="flex-1 flex items-center justify-center bg-purple-100">
          <img src={loginImage} alt="Login" className="w-80 h-80 object-cover rounded-full shadow-lg" />
        </div>

        {/* Right side with login/logout button */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Log in
            </button>
          )}
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
