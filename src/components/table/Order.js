import React from 'react';

const Order = () => {
  return (
    <>
      {/*Custom CSS*/}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        select {\n            text-indent: 1px;\n            text-overflow: '';\n            width: 50px;\n            height: 50px;\n            -webkit-appearance: none;\n            -moz-appearance: none;\n            appearance: none;\n            background: transparent url(https://pagedone.io/asset/uploads/1716542745.png) no-repeat 94% center;\n        }\n    ",
        }}
      />
      <section className="">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-start items-start lg:gap-14 gap-10 inline-flex">
            <div className="w-full justify-between items-center gap-8 flex lg:flex-row flex-col">
              <h2 className="w-full text-gray-900 text-3xl font-bold font-manrope leading-normal">
                Mes commandes
              </h2>
              <div className="w-full justify-end items-center gap-5 flex sm:flex-row flex-col">
                <div className="relative lg:w-64 w-full ">
                  <select
                    id="countries"
                    className="focus:outline-none px-4 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] placeholder-gray-400 text-gray-900 text-base font-normal leading-relaxed border border-gray-300 justify-start items-center gap-2 inline-flex
                      h-12 lg:w-64 w-full "
                  >
                    <option value={1} selected="">
                      All Orders
                    </option>
                    <option value={2}>Selected Orders</option>
                    <option value={3}>Customized Orders</option>
                    <option value={4}>Other Orders</option>
                  </select>
                </div>
                <button className="lg:w-fit w-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                  <span className="px-2 py-px text-white text-base font-semibold leading-relaxed whitespace-nowrap">
                    Add Refund Request
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full">
              {/* Overflow on small screens */}
              <div className="overflow-x-auto">
                <table className="w-full rounded-lg mb-5 sm:w-[300px] sm:overflow-x-auto">
                  <thead className="overflow-x-auto">
                    <tr>
                      <td className="pl-8">ID</td>
                      <td className="pl-8">Date</td>
                      <td className="pl-8">Statut</td>
                      <td className="pl-8">Option</td>
                    </tr>
                  </thead>
                  <tbody className="overflow-x-auto">
                    <tr className="bg-white border-b border-gray-400">
                      <td className="p-8">
                        <div className="flex flex-col gap-1">
                          <h5 className="text-gray-500 text-lg font-medium leading-relaxed">
                            #2012455
                          </h5>
                        </div>
                      </td>
                      <td className="p-8 whitespace-nowrap text-gray-500 text-base font-medium leading-relaxed">
                        06 Jun, 2024 <br />
                        <span className="text-gray-900">At 02:17 PM</span>
                      </td>
                      <td className="p-8">
                        <div className="w-fit pl-2 pr-2.5 py-0.5 bg-indigo-50 rounded-full justify-center items-center gap-1 flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={13}
                            height={12}
                            viewBox="0 0 13 12"
                            fill="none"
                          >
                            <path
                              d="M6.12428 5.49991V7.49991M3.46751 1.7063L3.38331 1.73815C2.93176 1.90893 2.70599 1.99432 2.50861 2.12922C2.31124 2.26411 2.14967 2.44345 1.82654 2.80212L1.76562 2.86973M8.62382 1.7063L8.70802 1.73815C9.15957 1.90893 9.38534 1.99432 9.58271 2.12922C9.78009 2.26411 9.94166 2.44345 10.2648 2.80212L10.3257 2.86973M6.12428 10.4999C5.65986 10.4999 5.42765 10.4999 5.2327 10.4742C3.8865 10.297 2.82717 9.23769 2.64994 7.89149C2.62428 7.69655 2.62428 7.46433 2.62428 6.99991V6.49991C2.62428 6.03549 2.62428 5.80328 2.64994 5.60834C2.82717 4.26214 3.8865 3.20281 5.2327 3.02558C5.42765 2.99991 5.65986 2.99991 6.12428 2.99991C6.5887 2.99991 6.82091 2.99991 7.01586 3.02558C8.36206 3.20281 9.42138 4.26214 9.59861 5.60834C9.62428 5.80328 9.62428 6.03549 9.62428 6.49991V6.99991C9.62428 7.46433 9.62428 7.69655 9.59861 7.89149C9.42138 9.23769 8.36206 10.297 7.01586 10.4742C6.82091 10.4999 6.5887 10.4999 6.12428 10.4999Z"
                              stroke="#4F46E5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-center text-indigo-600 text-xs font-medium leading-normal">
                            Ongoing
                          </span>
                        </div>
                      </td>
                      <td className="py-10 px-2.5">
                        <button className="p-2 hover:bg-gray-100 transition-all duration-700 ease-in-out group flex item-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 16.9896V17.0396M12 11.976V12.026M12 6.96228V7.01228"
                              stroke="black"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
