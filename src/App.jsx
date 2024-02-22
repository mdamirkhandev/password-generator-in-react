import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      password += str[Math.floor(Math.random() * str.length)];
    }

    setPassword(password);
  }, [length, numberAllowed, symbolAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 15); if needed to set range of selection
    navigator.clipboard.writeText(password);

    // alert("Password copied to clipboard"); if needed to show alert
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed, generatePassword]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-800">
        <h1 className="text-2xl text-center font-bold mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none px-3 py-1 w-full"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="bg-green-500 px-3 py-1">
            Copy
          </button>
        </div>
        <div className="flex justify-around items-center">
          <div className="flex items-center">
            <input
              type="range"
              min="6"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="length">Length: ({length})</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label className="ml-2">Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label className="ml-2">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
