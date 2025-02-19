import Navbar from '@/components/Navbar';
import React from 'react';

const BusinessReport = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-900 dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar/>
        <div className="px-40 flex flex-1 justify-center py-5 mt-14">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-gray-300 tracking-light text-3xl font-bold leading-tight min-w-72">Business Report</p>
            </div>
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/bf7365d3-560b-4862-aa6c-3ac0c227a3c4.png")' }}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-300 text-[22px] font-bold leading-tight tracking-[-0.015em]">Acme Inc.</p>
                    <p className="text-gray-500 text-base font-normal leading-normal">Delaware Corporation · 2016</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2">
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Owner</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">John Smith</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Company Type</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">For Profit</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Incorporation Date</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">May 1, 2016</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Directors/Officers</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">Jane Doe</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Employee Count</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">500</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Social Media</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">LinkedIn, Twitter, Facebook, Instagram</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2 col-span-2 pr-[50%]">
                <p className="text-gray-500 text-sm font-normal leading-normal">Estimated Worth</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">$100M</p>
              </div>
            </div>
            <h2 className="text-gray-300 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Agent</h2>
            <div className="p-4 grid grid-cols-2">
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Agent Name</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">Jane Johnson</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Address</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">1234 Elm St., San Francisco, CA 94107</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessReport;