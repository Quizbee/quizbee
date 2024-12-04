import React, { useState } from 'react';
import { Navigate, useBeforeUnload, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import logo from '../assets/logo.png';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <header className="fixed flex w-full items-center justify-between bg-black px-8 py-0 text-white shadow-lg shadow-zinc-900 md:px-32">
        <a>
          <img
            src={logo}
            alt="Logo"
            className="w-40 transition-all hover:scale-105"
            onClick={() => navigate('/')}
          ></img>
        </a>
        <ul className="hidden items-center gap-12 text-base font-semibold xl:flex">
          <button
            className="rounded-md p-3 text-xl transition-all hover:scale-105"
            onClick={() => navigate('/')}
          >
            Home
          </button>

          {isLoggedIn ? (
            <>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={() => navigate('/')}
              >
                Decks
              </button>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={() => navigate('/')}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="rounded-md p-3 text-xl transition-all hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          )}
        </ul>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:scale-105 hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden"
          ripple={false}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>

        <div
          className={`absolute left-0 top-44 flex w-full flex-col items-center gap-6 bg-black pb-6 text-lg font-semibold shadow-md shadow-zinc-900 transition-transform xl:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'transform 0.3s ease, opacity 0.3 ease' }}
        >
          <li className="w-full cursor-pointer list-none p-5 text-center transition-all hover:scale-105">
            Home
          </li>
          <li className="w-full cursor-pointer list-none p-5 text-center transition-all hover:scale-105">
            Deck
          </li>
          {isLoggedIn ? (
            <li className="list-none rounded-md p-3 text-xl transition-all hover:scale-105">
              Sign Out
            </li>
          ) : (
            <li className="list-none rounded-md p-3 text-xl transition-all hover:scale-105">
              Sign In
            </li>
          )}
        </div>
      </header>
    </div>
  );
};

export default MainNavigation;
