import React from "react";
import { useAuth } from "./Auth";
import { Products } from "./pages/Products";
import { SlideShow } from "./pages/SlideShow";
import { FirstInfo } from "./pages/FirstInfo";
import { NewArrivals } from "./pages/NewArrivals";
import { MainCategoryList } from "./pages/MainCategoryList";
import { MainCategory } from "./pages/MainCategory";


export const Index = () => {

  const auth = useAuth();

  return (
    <>
      <div>
        <div className="mx-auto container flex text-center items-center justify-center shadow-sm p-6">
          <div>
            <div className="md:hidden mx-auto ">
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
        <hr className="md: hidden" />
        <div className='md:mt-5 border container mx-auto p-5 grid grid-cols-12 gap-5'>
          <div className='md:col-span-4 lg:col-span-3 hidden md:block'>
            <MainCategory />
          </div>
          <div className='col-span-12 md:col-span-8 lg:col-span-9 '>
            <SlideShow />
          </div>
          <br />
        </div>
        <FirstInfo />
        <NewArrivals />
        <Products />
        <FirstInfo />
        <MainCategoryList />
        <br />
        <br />
      </div>
    </>
  )
};
