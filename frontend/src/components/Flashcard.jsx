import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flex h-48 w-80 cursor-pointer items-center justify-center rounded-lg bg-zinc-600 p-4 text-center shadow-lg transition-transform duration-500 ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className={`backface-hidden flex h-full w-full items-center justify-center ${
          isFlipped ? 'hidden' : 'block'
        }`}
      >
        <p className="text-md font-semibold italic">{question}</p>
      </div>
      <div
        className={`backface-hidden flex h-full w-full items-center justify-center ${
          isFlipped ? 'block' : 'hidden'
        }`}
      >
        <p className="text-lg font-semibold">{answer}</p>
      </div>
    </div>
  );
};

export default Flashcard;
