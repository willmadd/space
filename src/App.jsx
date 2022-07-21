import { Float, Html, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import Ground from "./Ground";
import Loader from "./Loader";
import Rings from "./Rings";
import Tube from "./Tube";
import Walls from "./Walls";
import Wraith from "./Wraithgltf";

const Scene = () => {
  const ref = useRef(null);
  const spaceShip = useRef(null);
  const bloomRef = useRef(null);
  const floatRef = useRef(null);

  const [active, setActive] = useState(false);

  const [spaceShipStage, setSpaceShipStage] = useState(0);

  useFrame(
    state => {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, !active ? 2 : 10, 0.1);
      spaceShip.current.position.y = THREE.MathUtils.lerp(spaceShip.current.position.y, spaceShipStage === 0 ? -0.3 : 0.2, 0.1);
      spaceShip.current.position.z = THREE.MathUtils.lerp(spaceShip.current.position.z, spaceShipStage === 2 ? 1000 : 0, 0.001);
      bloomRef.current.intensity = THREE.MathUtils.lerp(bloomRef.current.intensity, spaceShipStage === 0 ? 0 : 1, 1);
      let x = spaceShip.current.position.x;
      let y = spaceShip.current.position.y;
      let z = spaceShip.current.position.z;
      state.camera.lookAt(x, y, z);
      state.camera.updateProjectionMatrix();
    }
  );

  return (
    <>
      <color args={[0, 0, 0]} attach={"background"} />
      <spotLight color={[1, 0.25, 0.7]} intensity={spaceShipStage===0?0.2:1.5} angle={0.6} penumbra={0.5} position={[5, 5, -0]} castShadow />
      <spotLight color={[0.14, 0.5, 1]} intensity={spaceShipStage===0?0.2:2} angle={0.6} penumbra={0.5} position={[-5, 5, -0]} castShadow />

      <Ground />
      <Stars />
      <PerspectiveCamera ref={ref} makeDefault position={[5, 2, 5]} args={[45, 1.2, 1, 1000]} />
      <Html center>
        <div style={{ width: "100vw", height: "100vh", padding: 20, flexDirection: "column", display: "flex" }}>
          <button
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#39ff14",
              fontSize: 20,
              backgroundColor: "black",
              outline: "none",
              borderColor: "#39ff14",
              borderRadius: 20,
              padding: 12,
              width: 120,
            }}
            onClick={() => setActive(prev => !prev)}
          >
            Change Camera
          </button>
          <button
            style={{
              width: 120,
              marginTop: 20,
              fontFamily: "'Orbitron', sans-serif",
              color: "#39ff14",
              fontSize: 20,
              backgroundColor: "black",
              outline: "none",
              borderColor: "#39ff14",
              borderRadius: 20,
              padding: 12,
            }}
            onClick={() => setSpaceShipStage(prev => prev + 1)}
          >
            {spaceShipStage === 0 ? "Enter SpaceShip":"Blast Off!"}
          </button>
        </div>
      </Html>
      <OrbitControls
        maxPolarAngle={Math.PI * 0.45}
        minPolarAngle={Math.PI * 0.12}
        dampingFactor={0.25}
        rotateSpeed={0.1}
        minAzimuthAngle={Math.PI * 0.1}
        maxAzimuthAngle={Math.PI * 0.3}
      />
      <Float
        ref={floatRef}
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={spaceShipStage === 0 ? 0 : 1} // XYZ rotation intensity, defaults to 1
        floatIntensity={spaceShipStage === 0 ? 0 : 1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Wraith position={[0, -0.3, 0]} scale={[0.01, 0.01, 0.01]} shipRef={spaceShip} />
      </Float>
      <Walls />
      <Tube />

      <Rings />

      <ambientLight intensity={1} color={"#1c1b1b"} />
      <EffectComposer>
        <Bloom
          height={300}
          blendFunction={BlendFunction.ADD}
          width={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
          intensity={0}
          ref={bloomRef}
        />
        <ChromaticAberration offset={[0.0005, 0.0012]} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
};

const App = () => {
  return (
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default App;
