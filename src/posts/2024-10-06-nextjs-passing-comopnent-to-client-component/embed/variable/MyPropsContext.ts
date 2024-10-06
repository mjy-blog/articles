"use client";

import { createContext } from "react";

export interface MyProps {
  blah: string;
  something: number;
}

export const MyPropsContext = createContext<MyProps | undefined>(undefined);
