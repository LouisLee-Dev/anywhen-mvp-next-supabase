import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SignUpFormProps {
  open: boolean;
  onClose: () => void;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={() => {
      onClose();
    }}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-lg xl:max-w-xl">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>Welcome to anyWhen!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              type="string"
              defaultValue=""
              className="col-span-4"
              placeholder="Full Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              type="email"
              defaultValue=""
              className="col-span-4"
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="password"
              type="password"
              defaultValue=""
              className="col-span-4"
              placeholder="Password"
            />
          </div>
          <Separator />
          {/* <CalendarForm /> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="phoneNum"
              type="phone"
              defaultValue=""
              className="col-span-4"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">Register</Button>
        </DialogFooter>
        <Separator />
        <div className="flex flex-col gap-1">
          <Button type="submit">
            Continue with
            <svg
              className="block h-5 w-5"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path
                className="fill-current text-blue-500"
                d="M32 0v32H0V0z"
              ></path>
              <path
                className="fill-current text-white"
                d="M22.94 16H18.5v-3c0-1.27.62-2.5 2.6-2.5h2.02V6.56s-1.83-.31-3.58-.31c-3.65 0-6.04 2.21-6.04 6.22V16H9.44v4.63h4.06V32h5V20.62h3.73l.7-4.62z"
              ></path>
            </svg>{" "}
            acebook
          </Button>
          <Button type="submit">
            Continue with{" "}
            <svg
              className="block h-5 w-5"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path
                className="fill-current text-blue-500"
                d="M24.12 25c2.82-2.63 4.07-7 3.32-11.19H16.25v4.63h6.37A5.26 5.26 0 0 1 20.25 22z"
              ></path>
              <path
                className="fill-current text-green-500"
                d="M5.62 21.31A12 12 0 0 0 24.12 25l-3.87-3a7.16 7.16 0 0 1-10.69-3.75z"
              ></path>
              <path
                className="fill-current text-yellow-500"
                d="M9.56 18.25c-.5-1.56-.5-3 0-4.56l-3.94-3.07a12.08 12.08 0 0 0 0 10.7z"
              ></path>
              <path
                className="fill-current text-red-500"
                d="M9.56 13.69c1.38-4.32 7.25-6.82 11.19-3.13l3.44-3.37a11.8 11.8 0 0 0-18.57 3.43l3.94 3.07z"
              ></path>
            </svg>{" "}
            oogle
          </Button>
          <Button type="submit">
            Continue with
            <svg
              className="block h-5 w-5 text-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m13.3 2.1a5.1 5.1 0 0 1 3.8-2.1 5.1 5.1 0 0 1 -1.2 3.8 4.1 4.1 0 0 1 -3.6 1.7 4.5 4.5 0 0 1 1-3.4zm-5 3.7c-2.8 0-5.8 2.5-5.8 7.3 0 4.9 3.5 10.9 6.3 10.9 1 0 2.5-1 4-1s2.6.9 4 .9c3.1 0 5.3-6.4 5.3-6.4a5.3 5.3 0 0 1 -3.2-4.9 5.2 5.2 0 0 1 2.6-4.5 5.4 5.4 0 0 0 -4.7-2.4c-2 0-3.5 1.1-4.3 1.1-.9 0-2.4-1-4.2-1z"></path>
            </svg>{" "}
            pple
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SignUpForm;
