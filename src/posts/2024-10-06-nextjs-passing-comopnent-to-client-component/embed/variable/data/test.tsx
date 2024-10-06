"use client";

import { useContext } from "react";

import { MyProps, MyPropsContext } from "../MyPropsContext";

function Test({ blah, something }: MyProps) {
  return (
    <div>
      <p>blah: {blah}</p>
      <p>something: {something}</p>
    </div>
  );
}

export default function ActualComponent() {
  const context = useContext(MyPropsContext);
  return context && <Test {...context} />;
}
