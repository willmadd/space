import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from  'three'

const Ground = () => {

const [roughness, normal] = useLoader(THREE.TextureLoader, ['./images/terrain-roughness.jpeg', './images/terrain-normal.jpeg'])

useEffect(()=>{
    [normal, roughness].forEach(t => {
        t.wrapS = THREE.RepeatWrapping
        t.wrapT = THREE.RepeatWrapping
        t.repeat.set(5,5)
    })
    normal.encoding = THREE.LinearEncoding
}, [roughness, normal])

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0,0,0]}>
      <planeBufferGeometry castShadow receiveShadow args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContract={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        debug={0}
        reflectorOffset={0.1}
        normalMap={normal}
        normalScale={[0.15,0.15]}
        roughnessMap={roughness}
      />
      {/* <meshStandardMaterial color={'red'}/> */}
    </mesh>
  );
};

export default Ground;
