import * as THREE from 'three'
import type { ThreeScene } from '../types'

interface FloatingShape {
  mesh: THREE.Mesh
  rotVel: THREE.Vector3
  posVel: THREE.Vector3
}

const SHAPE_BOUNDS = 8

export function createFloatingGeometryScene(width: number, height: number): ThreeScene {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
  camera.position.z = 12

  const geometries = [
    new THREE.IcosahedronGeometry(1.4, 0),
    new THREE.OctahedronGeometry(1.1),
    new THREE.TetrahedronGeometry(1.2),
    new THREE.IcosahedronGeometry(0.9, 1),
    new THREE.OctahedronGeometry(0.8),
    new THREE.IcosahedronGeometry(0.6, 0),
    new THREE.TetrahedronGeometry(0.7),
  ]

  const shapes: FloatingShape[] = geometries.map((geo) => {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(
      (Math.random() - 0.5) * SHAPE_BOUNDS * 2,
      (Math.random() - 0.5) * SHAPE_BOUNDS,
      (Math.random() - 0.5) * 4,
    )

    const rotSpeed = 0.004 + Math.random() * 0.008
    const driftSpeed = 0.003 + Math.random() * 0.005
    const angle = Math.random() * Math.PI * 2

    return {
      mesh,
      rotVel: new THREE.Vector3(
        (Math.random() - 0.5) * rotSpeed * 2,
        (Math.random() - 0.5) * rotSpeed * 2,
        (Math.random() - 0.5) * rotSpeed,
      ),
      posVel: new THREE.Vector3(
        Math.cos(angle) * driftSpeed,
        Math.sin(angle) * driftSpeed * 0.6,
        0,
      ),
    }
  })

  shapes.forEach(({ mesh }) => scene.add(mesh))

  const update = (elapsed: number) => {
    shapes.forEach(({ mesh, rotVel, posVel }) => {
      mesh.rotation.x += rotVel.x
      mesh.rotation.y += rotVel.y
      mesh.rotation.z += rotVel.z

      mesh.position.x += posVel.x
      mesh.position.y += posVel.y

      if (mesh.position.x > SHAPE_BOUNDS) mesh.position.x = -SHAPE_BOUNDS
      if (mesh.position.x < -SHAPE_BOUNDS) mesh.position.x = SHAPE_BOUNDS
      if (mesh.position.y > SHAPE_BOUNDS * 0.6) mesh.position.y = -SHAPE_BOUNDS * 0.6
      if (mesh.position.y < -SHAPE_BOUNDS * 0.6) mesh.position.y = SHAPE_BOUNDS * 0.6
    })

    camera.position.y = Math.sin(elapsed * 0.07) * 0.4
    camera.lookAt(0, 0, 0)
  }

  const dispose = () => {
    geometries.forEach((g) => g.dispose())
    shapes.forEach(({ mesh }) => (mesh.material as THREE.Material).dispose())
  }

  return { scene, camera, update, dispose }
}
