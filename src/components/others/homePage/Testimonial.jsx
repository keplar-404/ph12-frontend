import React from "react";

export default function Testimonial() {
  return (
    <>
      <section className="my-[8rem]">
        <div className="flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
          <h1 className="text-4xl font-semibold leadi text-center balboo">
           Testimonial's
          </h1>
        </div>
        <div className=" mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
          <div className="flex flex-col items-center mx-12 lg:mx-0">
            <div className="relative text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="absolute top-0 left-0 w-8 h-8 text-gray-700"
              >
                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-lg italic">
              This organization is great i love. I have donated many donation. I also get donated from other help full people.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="absolute bottom-0 right-0 w-8 h-8 text-gray-700"
              >
                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-violet-400"></span>
            <p>Leroy Jenkins</p>
          </div>
          <div className="flex flex-col items-center max-w-lg mx-12 lg:mx-0">
            <div className="relative text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="absolute top-0 left-0 w-8 h-8 text-gray-700"
              >
                <path
                  fill="currentColor"
                  d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"
                ></path>
              </svg>
              <p className="px-6 py-1 text-lg italic">
               When ever i think i will help some poor animal who is suffiring, the only think in my came up is pwefact website and their organization. 
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="absolute bottom-0 right-0 w-8 h-8 text-gray-700"
              >
                <path
                  fill="currentColor"
                  d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"
                ></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg bg-violet-400"></span>
            <p>Leroy Jenkins</p>
          </div>
        </div>
      </section>
    </>
  );
}
