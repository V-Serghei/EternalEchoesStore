"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
           
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Welcome to EternalEchoesStore – The Keeper of History and Inspiration
                
              </h1>
              <p>
                Here, among the whispers of time, lie treasures that can become a part of your story. In our store, you’ll discover carefully curated antique pieces, each carrying its unique energy and secrets from the past.

                Every item is a bridge between eras, a reflection of craftsmanship, artistry, and the spirit of those who lived before us. Our collection of rare artifacts and exquisite antiques invites you to connect with the timeless beauty of history.

                Immerse yourself in a world where every object has a tale to tell. Who knows? Perhaps here, you’ll find the piece you’ve been searching for all your life.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
                      aria-label="get started button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Get Started
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-black dark:text-white">
                  Let the past become part of your present.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
             
               
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/aboutdarch.png"
                    alt="Hero"
                    width={2212.64}
                    height={221.66}
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/aboutlight.png"
                    alt="Hero"
                    width={2212.64}
                    height={221.66}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
