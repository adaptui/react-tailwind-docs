import React from "react";
import cn from "classnames";

interface BleedProps {
  full: boolean;
}

export const Bleed: React.FC<BleedProps> = props => {
  const { full, children } = props;

  return (
    <div
      className={cn("bleed relative -mx-6 mt-6 md:-mx-8 2xl:-mx-24", { full })}
    >
      {children}
    </div>
  );
};

export default Bleed;
