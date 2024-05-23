import Link from "next/link";

export default function RenterSignIn() {
  return (
    <div className="auth-content-wrapper">
      <div className="space-y-4 py-8 lg:px-[8rem] px-2">
        <div className="flex items-center lg:text-2xl text-xl font-semibold text-gray-600">
          What Owners win!
        </div>
        <div className="lg:text-lg text-md font-semibold text-gray-500">
          Monthly Subscription
        </div>
        <div className="lg:text-lg text-md font-semibold text-gray-500">
          No Booking Fees
        </div>
        <div className="lg:text-lg text-md font-semibold text-gray-500">Guest Reviews</div>
        <div className="lg:text-lg text-md font-semibold text-gray-500">
          Real Time Pricing
        </div>
        <div className="lg:text-lg text-md font-semibold text-gray-500">
          Useful Reviews
        </div>
        <div className="lg:text-lg text-md font-semibold text-gray-500">No Search</div>
        <div className="flex flex-col items-center justify-center space-y-4 py-2">
          <Link
            className="lg:w-[320px] w-full rounded-md bg-primary lg:px-8 lg:py-4 px-4 py-2 text-center text-lg text-white"
            href="/auth/signin"
          >
            Join as a Property Manager
          </Link>
          <div className="lg:px-4 px-2 py-2">
            Don&#39;t have account? click here to{" "}
            <Link href="/auth/signup" className="font-semibold text-[#1890ff]">
              Sign Up.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
