"use client";

import { createContext, useContext, ReactNode } from "react";

const GclContext = createContext<any>(null);

export function GclProvider({ children }: { children: ReactNode }) {
  const query = async (queryString: string, variables = {}) => {
    const res = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryString, variables }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data;
  };

  return (
    <GclContext.Provider value={{ query }}>
      {children}
    </GclContext.Provider>
  );
}

export const useGclQuery = () => useContext(GclContext);
