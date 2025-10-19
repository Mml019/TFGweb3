import { useState } from "react";
import { DotLoader } from "react-spinners";

export default function Spinner({load}) {
 

  return (
    <div className="sweet-loading">
      <DotLoader
        color='#FFFF'
        loading={load}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
