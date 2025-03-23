import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { 
  faGoogle, 
  faApple, 
  faFacebookF 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEye, 
  faEyeSlash,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

const AuthPage = () => {
  const navto = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const response = await fetch("http://localhost/Game-Store-E-Commerce-main/src/login-admain/index.php", {
        method: 'POST',
        body: JSON.stringify({
          action: 'login',
          ...loginData
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      } else {
        window.localStorage.setItem("LoginAdmin","loged")
        navto(`/addgame`);
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const response = await fetch("http://localhost/Game-Store-E-Commerce-main/src/login-admain/index.php", {
        method: 'POST',
        body: JSON.stringify({
          action: 'register',
          ...registerData
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setSuccessMessage('Registration successful! You can now login.');
      console.log('Registration successful:', data);
      
      setRegisterData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during registration');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="username"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200"
          value={loginData.username}
          onChange={handleLoginChange}
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200"
          value={loginData.password}
          onChange={handleLoginChange}
          disabled={isLoading}
          required
        />
        <button 
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={togglePasswordVisibility}
          disabled={isLoading}
        >
          <FontAwesomeIcon 
            icon={showPassword ? faEyeSlash : faEye} 
            className="h-5 w-5" 
          />
        </button>
      </div>
      
     
      
      <button
        type="submit"
        className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            Logging in...
          </>
        ) : 'Login'}
      </button>
    </form>
  );

 

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Right Section (Image Section) - Order 1 on small screens, Order 2 on larger screens */}
      <div className="w-full md:w-1/2 bg-green-50 flex flex-col justify-center items-center p-4 md:p-10 order-1 md:order-2">
        <div className="max-w-md">
          <div className="relative mb-12">
            <div className="relative z-10 flex justify-center">
              <div className="bg-white rounded-full p-4 border-2 border-green-300 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-green-300 rounded-full flex items-center justify-center">
                    <div className="text-white text-3xl md:text-4xl">♥</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 bg-white rounded-lg p-3 shadow-md">
              <div className="text-sm font-semibold">
                {isLogin ? "Canva Design" : "Get Started"}
              </div>
              <div className="text-xs text-gray-500">
                {isLogin ? "10 Task" : "Create Profile"}
              </div>
              <div className="mt-2 bg-gray-200 rounded-md px-2 py-1 text-xs inline-block">
                {isLogin ? "Design" : "Step 1"}
              </div>
            </div>
            
            <div className="absolute top-8 right-4 bg-white rounded-full p-1 shadow-sm w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="absolute bottom-12 right-4 bg-white rounded-full p-1 shadow-sm w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg md:text-xl">
              {isLogin 
                ? "Make your work easier and organized with " 
                : "Join our community and make work easier with "
              }
              <strong>Tuga's App</strong>
            </p>
          </div>
          
          <div className="flex justify-center mt-8 space-x-1">
            <div className={`${isLogin ? "w-2" : "w-6"} h-2 rounded-full ${isLogin ? "bg-gray-300" : "bg-green-500"}`}></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className={`${isLogin ? "w-6" : "w-2"} h-2 rounded-full ${isLogin ? "bg-green-500" : "bg-gray-300"}`}></div>
          </div>
        </div>
      </div>
      
      {/* Left Section (Form Section) - Order 2 on small screens, Order 1 on larger screens */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-10 bg-white order-2 md:order-1">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {isLogin ? "Welcome back!" : "Create Account"}
          </h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            {isLogin 
              ? "Simplify your workflow and boost your productivity with Tuga's App. Get started for free." 
              : "Join Tuga's App to simplify your workflow and boost productivity. Get started for free."
            }
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {isLogin ? renderLoginForm() :""}
          
          
          
        </div>
      </div>
    </div>
  );
};

export default AuthPage;