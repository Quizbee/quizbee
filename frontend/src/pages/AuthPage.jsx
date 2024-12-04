import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col bg-black px-6 py-8 text-white lg:px-8">
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-yellow-200 hover:text-yellow-400"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-zinc-600 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-200 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-sm transition-all hover:scale-105 hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a
              href="#"
              className="font-semibold text-yellow-200 hover:text-yellow-300"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
