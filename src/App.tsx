import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState<number>(8);
  const [numAllowed, setNumAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const passwordInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += '@!#$%^&*()_+{}~';
    }

    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const handleCopy = useCallback(() => {
    if (passwordInput.current) {
      passwordInput.current.select();
      navigator.clipboard.writeText(password);
    }
  }, [passwordInput, password]);

  return (
    <>
      <div className='w-full max-w-wd mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-10/12 py-1 px-9'
            placeholder='password'
            readOnly
            ref={passwordInput}
          />
          <button
            onClick={handleCopy}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(Number(e.target.value)); }}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
