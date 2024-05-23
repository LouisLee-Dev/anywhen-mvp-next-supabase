"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { Flag } from "lucide-react";
import { Star } from "lucide-react";
import { CarouselDemo } from "../components/CaroseulDemo";

export default function LandingSection() {
  return (
    <div className="w-full px-2 py-2 lg:px-[8rem] lg:py-8">
      <div className="space-y-4">
        <h1 className="text-center lg:text-3xl text-2xl font-bold">
          Demand-Driven Marketplace
        </h1>
        <h3 className="mx-auto max-w-[960px] text-center lg:text-xl text-lg font-medium leading-relaxed">
          Our unique user experience and{" "}
          <span className="text-[#1890ff]">demand-driven</span> market model
          saves the renter{" "}
          <span className=" text-[#1890ff]">time and money</span>, while
          simultaneously offering owners{" "}
          <span className=" text-[#1890ff]">new ways</span> to raise occupancy
          rates and run their businesses efficiently.
        </h3>
      </div>
      <div className="flex items-center justify-center lg:space-x-[4rem] lg:py-[4rem] py-4">
        <div className="flex lg:w-[640px] w-full flex-col items-center justify-center space-y-8">
          <h3 className="lg:text-2xl text-xl font-semibold text-center">
            It{"'"}s time for something different
          </h3>
          <div className="space-y-3">
            <div className="text-center lg:text-lg text-md text-gray-500">
              Short term rentals that work for everyone are a button click away
            </div>
            <div className="text-center lg:text-lg text-md text-gray-500">
              (or you can scroll down and read more)
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center lg:space-x-2 lg:px-8 px-2 gap-2">
            <Link
              href="/get-start/renter"
              className="flex w-full flex-col items-center justify-center rounded-md bg-gray-700 lg:p-4 p-2 lg:text-lg text-md text-white"
            >
              <div>GET STARTED AS A</div>
              <div>RENTER</div>
            </Link>
            <Link
              href="/get-start/owner"
              className="flex w-full flex-col items-center justify-center rounded-md border-2 border-solid border-gray-800 bg-white lg:p-4 p-2 lg:text-lg text-md"
            >
              <div>GET STARTED AS A</div>
              <div>PROPERTY MANAGER</div>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            className="h-[640px] w-auto"
            src="/assets/images/iphone-image.png"
            alt="phone-image"
          />
        </div>
      </div>
      <Separator />
      <div className="px-2 pt-12 lg:px-[8rem]">
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex lg:h-24 lg:w-24 w-16 h-16 items-center justify-center rounded-2xl border bg-gray-200">
              <Check />
            </div>
            <div className="lg:text-xl text:lg font-semibold text-gray-600">No Fees</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex lg:h-24 lg:w-24 w-16 h-16 items-center justify-center rounded-2xl border bg-gray-200">
              <Flag />
            </div>
            <div>
              <span className="lg:text-xl text:lg font-semibold  text-gray-600">
                Real Time Pricing
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex lg:h-24 lg:w-24 w-16 h-16 items-center justify-center rounded-2xl border bg-gray-200">
              <Star />
            </div>
            <div>
              <span className="lg:text-xl text:lg font-semibold  text-gray-600">
                No Search
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex lg:h-24 lg:w-24 w-16 h-16 items-center justify-center rounded-2xl border bg-gray-200">
              <Star />
            </div>
            <div>
              <span className="lg:text-xl text:lg font-semibold  text-gray-600">
                Easy Booking
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-8 py-16">
          <div className="w-[36rem]">
            <div className="text-center lg:text-3xl text-xl font-semibold text-gray-500">
              Heading explaining the main benefit of your app
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              className="h-full w-auto"
              src="/assets/images/landing-2.png"
              alt="phone-image"
            />
          </div>
        </div>
      </div>
      <Separator />
      
      {/* <div className="px-2 py-12 lg:px-[8rem]">
        <div className="flex justify-center">
          <CarouselDemo />
        </div>
      </div>  */}
      <Separator />
      <div className="px-2 py-12 lg:px-[8rem]">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="font-semibold text-gray-500 lg:text-3xl">
            Download the mobile app for free
          </span>
          <Button className="rounded-full bg-gray-700 px-8 py-4 lg:text-lg text-md">
            Click Here to Start Download
          </Button>
        </div>
      </div>
    </div>
  );
}
