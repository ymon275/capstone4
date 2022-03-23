import { useState, useEffect } from "react";

function UseEffectComponent() {
  const [val, valSet] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      valSet((v) => v + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{val}s</div>;
}

export default UseEffectComponent;
