import React, { useEffect, useRef, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

const Counter = (props: { message?: string }) => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  return (
    <AnimatedCounterBody
      key={renderCounter.current}
      count={renderCounter.current}
    />
  );
};

const transitions = {
  entering: {
    opacity: 0,
    backgroundColor: "#d9f99d",
  },
  entered: {
    opacity: 1,
    backgroundColor: "#d9f99d",
  },
  exiting: {
    opacity: 1,
    backgroundColor: "#ef4444",
  },
  exited: {
    opacity: 1,
  },
};

function AnimatedCounterBody({ count }: { count: number }) {
  const [showCount, setShowCount] = useState(true);

  useEffect(() => {
    setShowCount(false);

    setTimeout(() => {
      setShowCount(true);
    }, 300);
  }, [count]);

  return (
    <Transition in={showCount} timeout={500}>
      {(state) => (
        <div
          className="p-4 w-max"
          style={{ ...transitions[state], transition: "all .3s" }}
        >
          Renders: {count}
        </div>
      )}
    </Transition>
  );
}

export default Counter;
