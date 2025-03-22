import React from "react";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="h-auto lg:h-[80vh] w-full lg:w-[80vw] border-1 border-[#e4e4e7] mx-auto grid grid-cols-12 rounded-2xl lg:rounded-4xl">
        {/* Left side - testimonial */}
        <div className="lg:col-span-6 col-span-12 bg-black text-white hidden lg:block rounded-tl-2xl rounded-bl-2xl lg:rounded-tl-4xl lg:rounded-bl-4xl">
          <div className="flex flex-col justify-between h-full p-10">
            <h1 className="text-4xl">Acme Inc</h1>
            <div>
              <p className="text-2xl mb-5">
                "This library has saved me countless hours of work and helped me
                deliver stunning designs to my clients faster than ever before."
              </p>
              <p>Sofia Davis</p>
            </div>
          </div>
        </div>
        {/* Right side - form */}
        <div className="lg:col-span-6 col-span-12 rounded-2xl lg:rounded-tr-4xl lg:rounded-br-4xl">
          <div className="flex flex-col h-full p-5 lg:p-10 justify-center">
            <form className="w-full lg:w-[70%] mx-auto">
              <div className="text-center flex flex-col gap-y-2 my-4 lg:my-5">
                <h1 className="text-3xl lg:text-4xl font-bold">Sign In</h1>
                <p className="text-gray-500 text-sm lg:text-base">
                  Log In With Credentials
                </p>
              </div>
              <div className="w-full flex flex-col gap-y-2 lg:gap-y-3">
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    className="border-1 border-[#e4e4e7] w-full rounded p-1.5"
                  />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    className="border-1 border-[#e4e4e7] w-full rounded p-1.5"
                  />
                </div>
                <Button>Sign Up</Button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-500 text-xs lg:text-sm">
                  Forgot Password?
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
