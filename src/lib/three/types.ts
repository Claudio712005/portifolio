import type { PerspectiveCamera, Scene } from 'three'

export interface ThreeScene {
  scene: Scene
  camera: PerspectiveCamera
  update: (elapsed: number) => void
  dispose: () => void
}

export type SceneFactory = (width: number, height: number) => ThreeScene
