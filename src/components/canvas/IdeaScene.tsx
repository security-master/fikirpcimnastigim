import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { ParticleUniverse } from './ParticleUniverse'
import { NebulaNode } from './NebulaNode'
import { Connections } from './Connections'
import { useIdeaStore } from '../../store/ideaStore'

function SceneContent() {
  const ideas = useIdeaStore((s) => s.ideas)
  const selectedId = useIdeaStore((s) => s.selectedId)

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f5ff" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#ff00aa" />

      <ParticleUniverse />
      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />

      <Connections ideas={ideas} />

      {ideas.map((idea) => (
        <NebulaNode
          key={idea.id}
          id={idea.id}
          text={idea.text}
          color={idea.color}
          position={idea.position}
          isSelected={selectedId === idea.id}
        />
      ))}

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  )
}

export function IdeaScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      onPointerMissed={() => useIdeaStore.getState().selectIdea(null)}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  )
}
