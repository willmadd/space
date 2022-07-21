import React from "react";
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center style={{ fontFamily: "'Orbitron', sans-serif", color: '#39ff14', fontSize:20 }}>
      {Math.floor(progress)} % loaded
    </Html>
  );
};

export default Loader;
