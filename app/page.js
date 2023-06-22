"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { auth, db } from "../lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignUp } from "@/components";
import { useUserData, metrics } from "@/lib";

export default function Home() {
  const [user] = useAuthState(auth);
  const userData = useUserData();
  const currentDate = new Date().toLocaleDateString();

  const [water, setWater] = useState(null);
  const [steps, setSteps] = useState(null);
  const [weight, setWeight] = useState(null);
  const [calories, setCalories] = useState(null);

  const handleInput = (metric) => (e) => {
    e.stopPropagation();
    switch (metric.dbName) {
      case "water":
        setWater(e.target.value);
        break;
      case "steps":
        setSteps(e.target.value);
        break;
      case "weight":
        setWeight(e.target.value);
        break;
      case "calories":
        setCalories(e.target.value);
        break;
      default:
        break;
    }
  };

  const logItem = (dbName) => {
    try {
      let val;
      switch (dbName) {
        case "water":
          val = water;
          break;
        case "steps":
          val = steps;
          break;
        case "weight":
          val = weight;
          break;
        case "calories":
          val = calories;
          break;
        default:
          break;
      }

      const doSetItem = async () => {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          [dbName]: arrayUnion({
            date: currentDate,
            [dbName]: parseInt(val),
          }),
        });
        location.reload();
      };
      doSetItem();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex flex-col gap-16 items-center justify-center p-8 md:p-24">
      {user ? (
        userData ? (
          <>
            <h1 className="text-7xl font-bold">{currentDate}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {metrics.map((metric, idx) => (
                <div className="flex gap-4 items-center relative">
                  <Link
                    href={metric.path}
                    className="rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:cursor-pointer transition-all ease-in-out duration-500"
                  >
                    <Image
                      src={metric.icon}
                      priority
                      alt={`Icon for ${metric.label}`}
                      className="w-48 h-48"
                    />
                  </Link>
                  <div className="flex flex-col gap-3 items-center">
                    {!userData[metric.dbName].some(
                      (entry) => entry.date === currentDate
                    ) && (
                      <>
                        <input
                          type="number"
                          min="0"
                          className="w-36 h-10 rounded-lg text-neutral-700 bg-neutral-100 font-bold text-xl text-center"
                          onChange={handleInput(metric)}
                        />
                        <p className="font-semibold">{metric.label}</p>
                      </>
                    )}
                    {userData[metric.dbName].some(
                      (entry) => entry.date === currentDate
                    ) ? (
                      <p className="bg-emerald-600 w-36 py-1 px-6 rounded-lg font-bold text-2xl text-center text-neutral-200">
                        ✓
                      </p>
                    ) : (
                      <button
                        className="bg-emerald-600 hover:bg-emerald-500 w-36 py-1 px-6 rounded-lg font-bold text-2xl text-neutral-200 transition-all ease-in-out duration-500"
                        onClick={() => logItem(metric.dbName)}
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <SignUp />
      )}
    </main>
  );
}
