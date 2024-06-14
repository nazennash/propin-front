import React from "react";
import { useAuth } from "./Auth";
import { Products } from "./pages/Products";
import { SlideShow } from "./pages/SlideShow";
import { FirstInfo } from "./pages/FirstInfo";

export const Index = () => {

  const auth = useAuth();

  return (
    <>
      <div>
        <div className="mx-auto container flex text-center items-center justify-center shadow-sm p-6">
          <div>
            <div className="sm:hidden sm:ml-6 ">
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#24C6DC] sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <SlideShow />
        <Products />
        <FirstInfo />
      </div>
    </>
  )
};
