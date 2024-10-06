"use client";

import { ReactElement, useMemo, useState } from "react";

import { MyPropsContext } from "./MyPropsContext";

export interface ClientComponentProps {
  dynamicContent: ReactElement;
}

export function ClientComponent({ dynamicContent }: ClientComponentProps) {
  const [blah, setBlah] = useState("");
  const [something, setSomething] = useState(0);
  const contextValue = useMemo(() => ({ blah, something }), [blah, something]);

  return (
    <div>
      <input
        placeholder="blah"
        value={blah}
        onChange={(e) => setBlah(e.target.value)}
      />
      <button onClick={() => setSomething((n) => n + 1)}>
        Increase something (currently {something})
      </button>
      <MyPropsContext.Provider value={contextValue}>
        {dynamicContent}
      </MyPropsContext.Provider>
    </div>
  );
}
