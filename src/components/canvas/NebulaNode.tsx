import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useIdeaStore } from '../../store/ideaStore'
import { playSelect } from '../../hooks/useSound'

interface NebulaNodeProps {
  id: string
  text: string
  color: string
  position: [number, number, number]
  isSelected: boolean
}

export function NebulaNode({ id, text, color, position, isSelected }: NebulaNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const selectIdea = useIdeaStore((s) => s.selectIdea)
  const scale = isSelected ? 1.6 : hovered ? 1.3 : 1

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.15
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * (1 + Math.sin(t * 2) * 0.1))
    }
  })

  const displayText = text.length > 20 ? text.slice(0, 18) + '…' : text

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <mesh
          ref={glowRef}
          scale={scale * 2.5}
          onClick={(e) => {
            e.stopPropagation()
            selectIdea(id)
            playSelect()
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.15 : 0.06} />
        </mesh>

        <mesh
          ref={meshRef}
          scale={scale}
          onClick={(e) => {
            e.stopPropagation()
            selectIdea(id)
            playSelect()
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 2 : hovered ? 1.5 : 0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {(isSelected || hovered) && (
          <Text
            position={[0, 0.7, 0]}
            fontSize={0.25}
            color="#ffffff"
            anchorX="center"
            anchorY="bottom"
            maxWidth={3}
            textAlign="center"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {displayText}
          </Text>
        )}
      </group>
    </Float>
  )
}
