import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
const Rings = () => {
  const itemsRef = useRef([]);

  useFrame(() => {
    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 3.5;
      mesh.position.set(0, 0, -z);
      let dist = Math.abs(z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      let colorScale = 1;
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      colorScale *= 0.5;

      if (i % 2 == 1) {
        mesh.material.emissive = new THREE.Color(6, 0.15, 0.7).multiplyScalar(colorScale);
      } else {
        mesh.material.emissive = new THREE.Color(0.1, 0.7, 3).multiplyScalar(colorScale);
      }
    }
  });

  return (
    <group >
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
        console.log("asdf");
        return (
          <mesh ref={el => (itemsRef.current[i] = el)} key={i} position={[0, 0, 0]} castShadow receiveShadow>
            <torusGeometry args={[3.25, 0.05, 16, 100]} />
            <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Rings;
