"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Avatarr = () => {
  const { scene } = useGLTF("/avatar.glb"); // Adjust the path to where you place your .glb file
  return <primitive position={[0, -1, 0]} object={scene} dispose={null} />;
};

const Avatar = () => {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 25 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={1} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />
      <pointLight position={[0, 2, 5]} intensity={1} decay={2} distance={20} />

      <Avatarr />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 4}
        enableDamping
        dampingFactor={0.2}
      />
    </Canvas>
  );
};

export default Avatar;
