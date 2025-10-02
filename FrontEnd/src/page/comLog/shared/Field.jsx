import React from "react";

export default function Field({ label, htmlFor, children }) {
  return (
    <label className="block space-y-2" htmlFor={htmlFor}>
      <span className="text-black/80 text-sm md:text-base">{label}</span>
      {children}
    </label>
  );
}
