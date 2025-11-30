"use client";
import { useEffect, useState } from "react";
const WORD_LENGTH = 5;
const regexAsciiAlpha = /^[a-zA-Z]$/;
export default function App() {
  // The word we are looking for
  const [solution, setSolution] = useState("");
  // Each row is a guess
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  // The current row
  const [currentGuess, setCurrentGuess] = useState("");
  // Is the game over
  const [isGameOver, setIsGameOver] = useState(false);
   // Did the player guess correct
  const [isPlayerLucky, setIsPlayerLucky] = useState(false);

  useEffect(() => {
    // Event handler that handles keypress
    const handleKeypress = (event: { key: string }) => {
      // Do nothing if game is over
      if (isGameOver) {
        return;
      }
      // If Enter is presssed
      if (event.key === "Enter") {
        // If we press enter before we've added all chars in the row
        if (currentGuess.length !== 5) {
          return;
        }
        // Spread function array, copies the elements of guesses into newGuesses
        const newGuesses = [...guesses];
        // Find the first row that is null and set it to currentGuess
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        // Update rows
        setGuesses(newGuesses);
        // Clear currenet guess. Here you might think that this sets currentGuess to "", however this is done at next re-render. Hence 
        // we can reference currentGuess in the following line
        setCurrentGuess("");
        // If the current row equals the solution => end gamee
        const isCorrect = solution == currentGuess.toLowerCase();
        if(isCorrect) {
          setIsPlayerLucky(true)
        }
        if (isCorrect || guesses.findIndex((val) => val == null) >= 5) {
          setIsGameOver(true);
        }
      }
      // If we hit backspace, delete the last char
      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      // If the key is not a alpha cahr
      if (!regexAsciiAlpha.test(event.key)) {
        return;
      }
      // If we've added all the chars in the row
      if (currentGuess.length >= 5) {
        return;
      }
      setCurrentGuess((oldGuess) => oldGuess + event.key);
    };
    // Add eventlistnern and attach handler
    window.addEventListener("keydown", handleKeypress);
    // Remove handler
    return () => window.removeEventListener("keydown", handleKeypress);
  }, [currentGuess, isGameOver, solution, guesses]);

  useEffect(() => {
    const loadRandomWord = async () => {
        const response = await fetch("/api/random-words", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch random words");
        }
        const words: string[] = await response.json();
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setSolution(randomWord);
        return;
    };
    loadRandomWord();
  }, []);

  return (
    <>
    <div className="flex justify-center w-full p-4">
      <div className="flex flex-col gap-4 border-8 p-2 rounded-md border-b-gray-500 border-r-gray-500 bg-gray-400">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Line
              key={i}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
            />
          );
        })}
      </div>
    </div>
    {isPlayerLucky &&
    (<div className="text-[24px] text-center">Congratulations, you won!</div>)
    
    }
    {isGameOver && 
      (<div className="text-[24px] text-center">The correct word is {solution}</div>) }
  </>);
}

function Line({ guess, isFinal, solution }:{guess:string, isFinal:boolean, solution: string}) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "flex text-[24px] border border-black w-[30px] h-[30px] justify-center items-center uppercase";
    if (isFinal) {
      if (char.toLowerCase() == solution[i]) {
        className += " bg-green-600";
      } else if (solution.includes(char.toLowerCase())) {
        className += " bg-yellow-600";
      } else {
        className += " bg-red-600";
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }
  return <div className="flex text-[24px] gap-2">{tiles}
  </div>;
}
