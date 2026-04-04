import * as THREE from 'three'
import type { ThreeScene } from '../types'

const GRID_SIZE = 38
const GRID_STEP = 0.38

export function createWaveMeshScene(width: number, height: number): ThreeScene {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 6, 13)
  camera.lookAt(0, 0, 0)

  const totalPoints = GRID_SIZE * GRID_SIZE
  const positions = new Float32Array(totalPoints * 3)

  for (let iz = 0; iz < GRID_SIZE; iz++) {
    for (let ix = 0; ix < GRID_SIZE; ix++) {
      const i = iz * GRID_SIZE + ix
      positions[i * 3] = (ix - GRID_SIZE / 2) * GRID_STEP
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = (iz - GRID_SIZE / 2) * GRID_STEP
    }
  }

  const geo = new THREE.BufferGeometry()
  const posAttr = new THREE.BufferAttribute(positions, 3)
  posAttr.setUsage(THREE.DynamicDrawUsage)
  geo.setAttribute('position', posAttr)

  const indices: number[] = []
  for (let iz = 0; iz < GRID_SIZE; iz++) {
    for (let ix = 0; ix < GRID_SIZE; ix++) {
      const i = iz * GRID_SIZE + ix
      if (ix < GRID_SIZE - 1) indices.push(i, i + 1)
      if (iz < GRID_SIZE - 1) indices.push(i, i + GRID_SIZE)
    }
  }
  geo.setIndex(indices)

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  })
  scene.add(new THREE.LineSegments(geo, lineMat))

  const pointMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x818cf8,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
  })
  scene.add(new THREE.Points(geo, pointMat))

  const update = (elapsed: number) => {
    for (let iz = 0; iz < GRID_SIZE; iz++) {
      for (let ix = 0; ix < GRID_SIZE; ix++) {
        const i = iz * GRID_SIZE + ix
        const x = (ix - GRID_SIZE / 2) * GRID_STEP
        const z = (iz - GRID_SIZE / 2) * GRID_STEP
        positions[i * 3 + 1] =
          Math.sin(x * 0.8 + elapsed * 0.5) * 0.3 +
          Math.sin(z * 0.6 + elapsed * 0.4) * 0.4 +
          Math.sin((x + z) * 0.35 + elapsed * 0.3) * 0.2
      }
    }
    posAttr.needsUpdate = true
  }

  const dispose = () => {
    geo.dispose()
    lineMat.dispose()
    pointMat.dispose()
  }

  return { scene, camera, update, dispose }
}
