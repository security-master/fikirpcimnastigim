import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Idea } from '../../store/ideaStore'

interface ConnectionsProps {
  ideas: Idea[]
}

export function Connections({ ideas }: ConnectionsProps) {
  const lineRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []

    for (let i = 0; i < ideas.length; i++) {
      for (let j = i + 1; j < ideas.length; j++) {
        const dist = Math.sqrt(
          (ideas[i].position[0] - ideas[j].position[0]) ** 2 +
          (ideas[i].position[1] - ideas[j].position[1]) ** 2 +
          (ideas[i].position[2] - ideas[j].position[2]) ** 2
        )
        if (dist < 6) {
          positions.push(...ideas[i].position, ...ideas[j].position)
          const c1 = new THREE.Color(ideas[i].color)
          const c2 = new THREE.Color(ideas[j].color)
          colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b)
        }
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [ideas])

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  if (ideas.length < 2) return null

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}
