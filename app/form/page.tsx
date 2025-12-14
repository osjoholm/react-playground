'use client'

import { useState } from "react";

export default function App() {

const [displayData, setDisplayData] = useState(false);
const [data , setData] = useState({
  username: "",
  fullName: "",
  age: ""
});

const printValues = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const username = formData.get("username") as string;
  const fullName = formData.get("fullName") as string;
  const age = formData.get("age") as string;

  setData({
    username,
    fullName,
    age
  });
  setDisplayData(true);
}  

  return (
    <div className="flex w-full flex-row gap-4 p-4">
      <form             onSubmit={printValues}
>
        <div>
          <label htmlFor="username" className="block mb-2">
            Username:
          </label>
          <input
            type="text"
            name="username"
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block mb-2">
            Full Name:
          </label>

          <input
            type="text"
            name="fullName"
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2">
            Age:
          </label>
          <input
            type="text"
            name="age"
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </div>
        {displayData && (
          <div className="mt-4 p-4 border-2 border-gray-300 rounded-md">
            <h2 className="text-lg font-bold mb-2">Submitted Data:</h2>
            <p>Username: {data.username}</p>
            <p>Full Name: {data.fullName}</p>
            <p>Age: {data.age}</p>
          </div>
        ) }
      </form>
    </div>
  );
}
