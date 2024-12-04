import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import logo from '../assets/logo.png';
import flashcards from '../assets/flashcards.png';

function LandingPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <header className="p-8 text-white">
        <div className="mt-10 grid min-h-screen w-full place-items-stretch bg-contain bg-center bg-no-repeat md:h-auto lg:h-auto">
          <div className="container mx-auto px-4 text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full !text-2xl leading-snug lg:max-w-3xl lg:!text-5xl"
            >
              Unlock Your{' '}
              <span className="leading-snug text-yellow-200">Learning</span>{' '}
              Potential with{' '}
              <span className="leading-snug text-yellow-200">Flashcards</span>.
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full text-base !text-gray-300 lg:text-lg"
            >
              Learning just got easier and more engaging! Our platform empowers
              you to create custom flashcard decks designed to help you master
              any subject, one card at a time. Whether you're preparing for an
              exam, picking up a new language, or exploring a passion, we make
              it simple and fun to achieve your goals.
            </Typography>
            <button
              className="mt-10 inline-flex items-center justify-center rounded border border-white bg-black px-5 py-3 text-center font-bold text-white hover:scale-105 hover:bg-zinc-700"
              onClick={() => navigate('/login')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-3 size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>

              <span className="text-xl">Get Started Today</span>
            </button>
            <div className="mt-8 grid w-full place-items-center">
              <div className="mt-4 flex w-full flex-row items-center justify-center space-x-6">
                <div>
                  <Typography variant="h2" className="text-left !text-3xl">
                    Why Choose Our{' '}
                    <span className="leading-snug text-yellow-200">
                      Flashcards?
                    </span>{' '}
                  </Typography>
                  <Typography
                    variant="lead"
                    className="text-left text-base !text-gray-300 lg:text-lg"
                  >
                    <ul className="mt-3 list-disc">
                      <li className="mb-3">
                        <strong>Tailored to You:</strong> Design decks that
                        match your unique learning style and pace.
                      </li>
                      <li className="mb-3">
                        <strong>Boost Memory:</strong> Leverage spaced
                        repetition to retain information longer.
                      </li>
                      <li className="mb-3">
                        <strong>Study on-the-go:</strong> with access across
                        devices.
                      </li>
                      <li className="mb-3">
                        <strong>Collaborative Learning:</strong> Share decks
                        with friends and learn together.
                      </li>
                    </ul>
                  </Typography>
                </div>
                <img src={logo} alt="Logo" className="h-90 w-90" />
              </div>
            </div>
            <div className="mt-8 grid w-full place-items-center">
              <div className="mt-4 flex w-full flex-row items-center justify-center space-x-6">
                <img src={flashcards} alt="Logo" className="h-90 w-90 mr-40" />
                <div>
                  <Typography variant="h2" className="text-left !text-3xl">
                    How It{' '}
                    <span className="leading-snug text-yellow-200">Works?</span>{' '}
                  </Typography>
                  <Typography
                    variant="lead"
                    className="text-left text-base !text-gray-300 lg:text-lg"
                  >
                    <ul className="mt-3 list-decimal">
                      <li className="mb-3">
                        <strong>Create:</strong> Build your own flashcards with
                        question and answer.
                      </li>
                      <li className="mb-3">
                        <strong>Organize:</strong> Arrange them into decks for
                        focused learning.
                      </li>
                      <li className="mb-3">
                        <strong>Review:</strong> Practice with smart algorithms
                        that adapt to your progress.
                      </li>
                      <li className="mb-3">
                        <strong>Succeed:</strong> Watch your skills grow with
                        every session.
                      </li>
                    </ul>
                  </Typography>
                </div>
              </div>
              <Typography
                variant="h1"
                color="blue-gray"
                className="mx-auto my-6 w-full !text-2xl leading-snug lg:max-w-3xl lg:!text-5xl"
              >
                Start Learning{' '}
                <span className="leading-snug text-yellow-200">Smarter</span>{' '}
                Today!
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto w-full pb-10 text-base !text-gray-300 lg:text-lg"
              >
                Don't let boring study methods hold you back. Transform the way
                you learn with flashcards built just for you. Sign up now and
                take the first step toward achieving your dreams!
              </Typography>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
