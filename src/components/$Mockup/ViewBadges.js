import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewBadges() {
  return (
    <div className="min-h-screen bg-white text-black font-mockup p-8">
      {/* Welcome text */}
      <div className="mb-6">
        <p>
          Hello <RoughNotation type="underline" show={true} color="black">user@email.com</RoughNotation>.
          Welcome you to <RoughNotation type="circle" show={true} color="black">CodeVerse</RoughNotation>.
          Let&apos;s start to explore more!
        </p>
      </div>

      <div className="flex gap-8">
        {/* User card */}
        <div className="border-2 border-black rounded-xl p-6 w-1/3">
          <div className="w-24 h-24 border-2 border-black rounded-full mx-auto mb-4"></div>
          <div className="text-center">
            <p className="font-bold">Full Name</p>
            <p className="text-sm">user@email.com</p>
          </div>
          <div className="mt-4">
            <div className="border border-black h-4 w-full relative">
              <div className="absolute top-0 left-0 h-4 w-1/3 border-r-2 border-black"></div>
              <span className="absolute inset-0 flex justify-center items-center text-xs">
                6/18
              </span>
            </div>
          </div>
        </div>

        {/* Stats + Badges */}
        <div className="flex-1">
          <div className="flex justify-between mb-6">
            {/* Course */}
            <div className="text-center">
              <p>Course</p>
              <p className="text-xl font-bold">2/3</p>
              <div className="border border-black h-3 w-40 mx-auto mt-2"></div>
            </div>
            {/* Training */}
            <div className="text-center">
              <p>Training</p>
              <p className="text-xl font-bold">0/2</p>
              <p className="text-sm">0 certificates</p>
              <div className="border border-black h-3 w-40 mx-auto mt-2"></div>
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="mb-2">Your badges</p>
            <div className="flex gap-4">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
                Badge 1
              </div>
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
                Badge 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
