"use client";

// interface INewPropertySectionProps {

// }
import NewPropertyForm from "./components/NewPropertyForm";

export default function NewPropertySection() {
  return (
    <div className="w-full p-4">
      <h1> New Property </h1>
      <NewPropertyForm></NewPropertyForm>
    </div>
  );
}
