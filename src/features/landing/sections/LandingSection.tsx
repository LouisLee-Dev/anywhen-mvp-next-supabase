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
        <h1 className="text-center text-3xl font-bold">
          Demand-Driven Marketplace
        </h1>
        <h2 className="text-center text-2xl font-semibold"></h2>
        <h3 className="mx-auto max-w-[960px] text-center text-xl font-medium leading-relaxed">
          Our unique user experience and{" "}
          <span className="text-[#1890ff]">demand-driven</span> market model
          saves the renter{" "}
          <span className=" text-[#1890ff]">time and money</span>, while
          simultaneously offering owners{" "}
          <span className=" text-[#1890ff]">new ways</span> to raise occupancy
          rates and run their businesses efficiently.
        </h3>
      </div>
      <div className="flex items-center justify-center space-x-[4rem] py-[4rem]">
        <div className="flex w-[640px] flex-col items-center justify-center space-y-8">
          <h3 className="text-2xl font-semibold">
            It&39;s time for something different
          </h3>
          <div className="space-y-3">
            <div className="text-center text-lg text-gray-500">
              Short term rentals that work for everyone are a button click away
            </div>
            <div className="text-center text-lg text-gray-500">
              (or you can scroll down and read more)
            </div>
          </div>
          <div className="flex w-full items-center space-x-2 px-8">
            <Link
              href="/get-start/renter"
              className="flex w-full flex-col items-center justify-center rounded-md bg-gray-700 p-4 text-lg text-white"
            >
              <div>GET STARTED AS A</div>
              <div>RENTER</div>
            </Link>
            <Link
              href="/get-start/owner"
              className="flex w-full flex-col items-center justify-center rounded-md border-2 border-solid border-gray-800 bg-white p-4 text-lg"
            >
              <div>GET STARTED AS A</div>
              <div>PROPERTY MANAGER</div>
            </Link>
          </div>
        </div>
        <div className="">
          <img
            className="h-[640px] w-auto"
            src="/assets/images/iphone-image.png"
            alt="phone-image"
          />
        </div>
      </div>
      <Separator />
      <div className="px-2 pt-12 lg:px-[8rem]">
        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border bg-gray-200">
              <Check />
            </div>
            <div className="text-xl font-bold text-gray-600">No Fees</div>
            <div>
              <p className="text-lg text-gray-500">This is future 1</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border bg-gray-200">
              <Flag />
            </div>
            <div>
              <span className="text-xl font-bold  text-gray-600">
                Real Time Pricing
              </span>
            </div>
            <div>
              <p className="text-lg text-gray-500">This is future 2</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border bg-gray-200">
              <Star />
            </div>
            <div>
              <span className="text-xl font-bold  text-gray-600">
                No Search
              </span>
            </div>
            <div>
              <p className="text-lg text-gray-500">This is future 3</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border bg-gray-200">
              <Star />
            </div>
            <div>
              <span className="text-xl font-bold  text-gray-600">
                Intuitive Booking Process
              </span>
            </div>
            <div>
              <p className="text-lg text-gray-500">This is future 3</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-8 py-16">
          <div className="w-[36rem]">
            <div className="text-center text-3xl font-semibold text-gray-500">
              Heading explaining the main benefit of your app
            </div>
          </div>
          <div>
            <img
              className="h-full w-auto"
              src="/assets/images/landing-2.png"
              alt="phone-image"
            />
          </div>
        </div>
      </div>
      {/* <Separator />
      <div className="px-2 py-12 lg:px-[8rem]">
        <div className="flex justify-center">
          <CarouselDemo />
        </div>
      </div> */}
      <Separator />
      <div className="px-2 py-12 lg:px-[8rem]">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="font-semibold text-gray-500 lg:text-3xl">
            Download the mobile app for free
          </span>
          <Button className="rounded-full bg-gray-700 px-8 py-4 text-lg">
            Click Here to Start Download
          </Button>
        </div>
      </div>
    </div>
  );
}
