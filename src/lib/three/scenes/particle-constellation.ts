import * as THREE from 'three'
import type { ThreeScene } from '../types'

const PARTICLE_COUNT = 80
const CONNECTION_DISTANCE = 2.8
const BOUNDS = 7
const MAX_CONNECTIONS = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2

interface ParticleData {
  vx: number
  vy: number
  vz: number
}

function buildSpriteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas)
}

export function createParticleConstellationScene(width: number, height: number): ThreeScene {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
  camera.position.z = 14

  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const particleData: ParticleData[] = []

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * BOUNDS * 2
    positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS

    const speed = 0.01 + Math.random() * 0.015
    const angle = Math.random() * Math.PI * 2
    const angle2 = Math.random() * Math.PI
    particleData.push({
      vx: Math.cos(angle) * Math.sin(angle2) * speed,
      vy: Math.sin(angle) * Math.sin(angle2) * speed,
      vz: Math.cos(angle2) * speed * 0.3,
    })
  }

  const particleGeo = new THREE.BufferGeometry()
  const posAttr = new THREE.BufferAttribute(positions, 3)
  posAttr.setUsage(THREE.DynamicDrawUsage)
  particleGeo.setAttribute('position', posAttr)

  const sprite = buildSpriteTexture()
  const particleMat = new THREE.PointsMaterial({
    size: 0.14,
    color: 0x818cf8,
    map: sprite,
    alphaMap: sprite,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false,
  })

  scene.add(new THREE.Points(particleGeo, particleMat))

  const linePositions = new Float32Array(MAX_CONNECTIONS * 6)
  const lineGeo = new THREE.BufferGeometry()
  const linePosAttr = new THREE.BufferAttribute(linePositions, 3)
  linePosAttr.setUsage(THREE.DynamicDrawUsage)
  lineGeo.setAttribute('position', linePosAttr)
  lineGeo.setDrawRange(0, 0)

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  })

  scene.add(new THREE.LineSegments(lineGeo, lineMat))

  const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE

  const update = (elapsed: number) => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3
      let x = positions[idx] + particleData[i].vx
      let y = positions[idx + 1] + particleData[i].vy
      let z = positions[idx + 2] + particleData[i].vz

      if (x > BOUNDS || x < -BOUNDS) { particleData[i].vx *= -1; x = Math.max(-BOUNDS, Math.min(BOUNDS, x)) }
      if (y > BOUNDS || y < -BOUNDS) { particleData[i].vy *= -1; y = Math.max(-BOUNDS, Math.min(BOUNDS, y)) }
      if (z > BOUNDS * 0.5 || z < -BOUNDS * 0.5) { particleData[i].vz *= -1; z = Math.max(-BOUNDS * 0.5, Math.min(BOUNDS * 0.5, z)) }

      positions[idx] = x
      positions[idx + 1] = y
      positions[idx + 2] = z
    }
    posAttr.needsUpdate = true

    let lineIdx = 0
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]

        if (dx * dx + dy * dy + dz * dz < connDistSq) {
          linePositions[lineIdx * 3] = positions[i * 3]
          linePositions[lineIdx * 3 + 1] = positions[i * 3 + 1]
          linePositions[lineIdx * 3 + 2] = positions[i * 3 + 2]
          lineIdx++
          linePositions[lineIdx * 3] = positions[j * 3]
          linePositions[lineIdx * 3 + 1] = positions[j * 3 + 1]
          linePositions[lineIdx * 3 + 2] = positions[j * 3 + 2]
          lineIdx++
        }
      }
    }

    linePosAttr.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx)

    camera.position.y = Math.sin(elapsed * 0.08) * 0.4
    camera.position.x = Math.sin(elapsed * 0.05) * 0.3
    camera.lookAt(0, 0, 0)
  }

  const dispose = () => {
    particleGeo.dispose()
    particleMat.dispose()
    sprite.dispose()
    lineGeo.dispose()
    lineMat.dispose()
  }

  return { scene, camera, update, dispose }
}
