import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login as loginService } from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error message
    try {
      if (isLogin) {
        const response = await loginService({ email, password });
        localStorage.setItem('token', response.token);
        login(response.user);
      } else {
        const response = await register({ username, email, password });
        localStorage.setItem('token', response.token);
        login(response.user);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error message
    }
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-10rem)] flex-1 flex-col bg-black px-6 py-8 text-white lg:px-8">
        <button
          className="justify-start-start mt-0 flex w-full"
          onClick={() => navigate('/')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <a className="pl-4 text-xl">Back</a>
        </button>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-yellow-200">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md bg-zinc-700 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-200 sm:text-sm/6"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-zinc-700 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-200 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-zinc-600 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-200 sm:text-sm/6"
                />
              </div>
            </div>

            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-sm transition-all hover:scale-105 hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {isLogin ? 'Not a member?' : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-yellow-200 hover:text-yellow-300"
            >
              {isLogin ? 'Sign up now' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
