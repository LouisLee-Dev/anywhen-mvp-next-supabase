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
    <div className="w-full">
      <div className="px-2 lg:px-[8rem]">
        <div className="grid grid-cols-2 gap-4 lg:gap-36">
          <div className="flex flex-col justify-stretch pt-10 lg:gap-28 lg:pt-72">
            <div className="flex justify-end">
              <p className="text-lg font-bold leading-6 text-gray-700">
                It's time for something different.
              </p>
            </div>
            <div>
              <span className="text-lg font-bold leading-7 text-gray-500">
                Short term rentals that work for everyone are a button click
                away (or you can scroll down and read more)
              </span>
            </div>
            <div className="flex justify-between">
              <Button className="w-full rounded-[1.7rem] bg-gray-700 lg:h-20 lg:w-56">
                <Link href="/get-start/renter">
                  <div className="flex flex-col">
                    <span className="lg:text-lg">GET STARTED AS A</span>
                    <span className="lg:text-lg">RENTER</span>
                  </div>
                </Link>
              </Button>
              <Button
                variant="secondary"
                className="w-full rounded-[1.7rem] border-2 border-solid border-gray-800 bg-white lg:h-20 lg:w-56"
              >
                <Link href="/get-start/owner">
                  <div className="flex flex-col">
                    <span className="lg:text-lg">GET STARTED AS A</span>
                    <span className="lg:text-lg">PROPERTY MANAGER</span>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:pt-44">
            <img
              className="h-full w-auto"
              src="/assets/images/phone-image.png"
              alt="phone-image"
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="px-2 pt-12 lg:px-[8rem]">
        <div className="flex justify-between">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="h-16 w-16 rounded-2xl border bg-gray-200 p-5">
              <Check />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-600">
                Feature One
              </span>
            </div>
            <div>
              <p className="text-lg text-gray-500">This is future 1</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="h-16 w-16 rounded-2xl border bg-gray-200 p-5">
              <Flag />
            </div>
            <div>
              <span className="text-xl font-bold  text-gray-600">
                Feature Two
              </span>
            </div>
            <div>
              <p className="text-lg text-gray-500">This is future 2</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="h-16 w-16 rounded-2xl border bg-gray-200 p-5">
              <Star />
            </div>
            <div>
              <span className="text-xl font-bold  text-gray-600">
                Feature Three
              </span>
            </div>
            <div>
              <p className="text-lg text-gray-500">This is future 3</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-16 lg:gap-[13rem]">
          <div>
            <span className="font-bold text-gray-500 lg:text-3xl">
              Heading explaining the main benefit of your app
            </span>
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
      <Separator />
      <div className="px-2 py-12 lg:px-[8rem]">
        <div className="flex justify-center">
          <CarouselDemo />
        </div>
      </div>
      <Separator />
      <div className="px-2 py-12 lg:px-[8rem]">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="font-bold text-gray-500 lg:text-3xl">
            Download the mobile app for free
          </span>
          <Button className="rounded-[1.7rem] bg-gray-700">
            Click Here to Start Download
          </Button>
        </div>
      </div>
    </div>
  );
}
