import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface PosterMeshProps {
  texture: THREE.Texture;
  isHovered: boolean;
}

function PosterMesh({ texture, isHovered }: PosterMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.y = isHovered ? 0.1 : 0;
      meshRef.current.position.z = isHovered ? 0.2 : 0;
    }
  });

  return (
    <mesh ref={meshRef} scale={isHovered ? 1.05 : 1}>
      <planeGeometry args={[2, 3]} />
      <meshStandardMaterial 
        map={texture} 
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

interface MoviePoster3DProps {
  posterUrl: string;
  className?: string;
  onClick?: () => void;
}

export default function MoviePoster3D({ posterUrl, className, onClick }: MoviePoster3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const texture = useTexture(posterUrl);

  return (
    <div 
      className={`movie-poster cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffd700" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <PosterMesh texture={texture} isHovered={isHovered} />
      </Canvas>
      
      {/* Golden glow effect overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-xl pointer-events-none" />
      )}
    </div>
  );
}