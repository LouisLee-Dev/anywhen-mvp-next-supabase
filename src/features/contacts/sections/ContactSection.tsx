"use client";
import axios from "axios";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { validate } from "@/lib/utils/validate";
import { Button } from "@/components/ui/button";
import Input from "@/features/contacts/components/Input";
import TextArea from "@/features/contacts/components/TextArea";
import Header from "@/core/layouts/pages/Header";
interface IValues {
  name: string;
  email: string;
  message: string;
}
interface IErrors extends Partial<IValues> {}
export const ContactFormSection = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageState, setMessageState] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(values);
    if (errors && Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    setLoading(true);
    axios
      .post("/api/mail", {
        name: values.name,
        email: values.email,
        message: values.message,
      })
      .then((res) => {
        if (res.status === 200) {
          setValues({ name: "", email: "", message: "" });
          setLoading(false);
          setSuccess(true);
          setMessageState(res.data.message);
        } else {
          setLoading(false);
          setMessageState(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessageState(String(err.message));
      });
    setLoading(false);
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="lg:w-1/3">
          <Input
            value={values.name}
            onChange={handleChange}
            id="name"
            name="name"
            label="Your Name"
            placeholder="John Doe"
            error={!!errors.name}
            errorMessage={!!errors.name ? errors.name : ""}
          />
          <Input
            value={values.email}
            onChange={handleChange}
            id="email"
            name="email"
            label="Your Email"
            placeholder="you@example.com"
            error={!!errors.email}
            errorMessage={!!errors.email ? errors.email : ""}
          />
          <TextArea
            value={values.message}
            onChange={handleChange}
            id="message"
            name="message"
            label="Your Message"
            placeholder="Your message here..."
            error={!!errors.message}
            errorMessage={!!errors.message ? errors.message : ""}
          />
          <Button className="mt-4 w-full" type="submit" disabled={loading}>
            {loading !== true ? (
              "SUBMIT"
            ) : (
              <div className="flex h-full w-full items-center justify-center ">
                <RotateCcw />
              </div>
            )}
          </Button>
          <p className="mt-5 text-green-500 dark:text-green-500">
            {success !== false ? (
              messageState
            ) : (
              <span className="text-red-500 dark:text-red-500">
                {messageState}
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};
