import * as THREE from 'three'
import { TYPE_FIELD_FRAGMENT, TYPE_FIELD_VERTEX } from './shaders'
import { paintTextTexture, type TextTextureRequest } from './text-texture'

export interface TypeFieldPalette {
  /** sRGB components, 0–1. */
  ink: [number, number, number]
  accent: [number, number, number]
}

export interface TypeFieldOptions {
  canvas: HTMLCanvasElement
  text: TextTextureRequest
  palette: TypeFieldPalette
  /** Fires once the first frame is on screen, so a fallback can step aside. */
  onFirstFrame?: () => void
}

const MAX_PIXEL_RATIO = 1.5
const MAX_TEXTURE_WIDTH = 2400
/** How fast the smoothed pointer chases the real one, per frame at 60fps. */
const POINTER_EASE = 0.08

/**
 * Owns the WebGL layer: an offscreen painting of the current headline, fed to a
 * single fullscreen shader pass that bends it. Deliberately framework-free so
 * the React side stays a thin mount/unmount wrapper.
 */
export class TypeField {
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private readonly geometry = new THREE.PlaneGeometry(2, 2)
  private readonly material: THREE.ShaderMaterial
  private readonly mesh: THREE.Mesh
  private readonly textCanvas = document.createElement('canvas')
  private readonly texture: THREE.CanvasTexture

  private text: TextTextureRequest
  private onFirstFrame?: () => void
  private painted = false
  private frame = 0
  private running = false
  private clock = new THREE.Clock()

  private pointer = new THREE.Vector2(0.5, 0.5)
  private pointerTarget = new THREE.Vector2(0.5, 0.5)
  private pointerStrength = 0
  private pointerStrengthTarget = 0
  private swap = 0

  constructor(options: TypeFieldOptions) {
    this.text = options.text
    this.onFirstFrame = options.onFirstFrame

    this.renderer = new THREE.WebGLRenderer({
      canvas: options.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setClearAlpha(0)

    this.texture = new THREE.CanvasTexture(this.textCanvas)
    this.texture.minFilter = THREE.LinearFilter
    this.texture.magFilter = THREE.LinearFilter
    this.texture.wrapS = THREE.ClampToEdgeWrapping
    this.texture.wrapT = THREE.ClampToEdgeWrapping

    this.material = new THREE.ShaderMaterial({
      vertexShader: TYPE_FIELD_VERTEX,
      fragmentShader: TYPE_FIELD_FRAGMENT,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uText: { value: this.texture },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uPointer: { value: this.pointer },
        uPointerStrength: { value: 0 },
        uProgress: { value: 0 },
        uSwap: { value: 0 },
        uOpacity: { value: 1 },
        uInk: { value: new THREE.Vector3(...options.palette.ink) },
        uAccent: { value: new THREE.Vector3(...options.palette.accent) },
      },
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.frustumCulled = false
    this.scene.add(this.mesh)

    this.resize()
  }

  /** True when the context was lost or never granted. */
  get failed(): boolean {
    return this.renderer.getContext() === null
  }

  /** Repaints the headline and lets it reform out of the warp field. */
  setText(text: TextTextureRequest, animate = false): void {
    const changed = animate && text.lines.join('\n') !== this.text.lines.join('\n')
    this.text = text
    this.repaint()
    if (changed) this.swap = 1
  }

  setPalette(palette: TypeFieldPalette): void {
    this.material.uniforms.uInk.value.set(...palette.ink)
    this.material.uniforms.uAccent.value.set(...palette.accent)
  }

  /** Pointer in normalised canvas space, origin bottom-left to match UVs. */
  setPointer(x: number, y: number, strength: number): void {
    this.pointerTarget.set(x, y)
    this.pointerStrengthTarget = strength
  }

  setProgress(progress: number): void {
    this.material.uniforms.uProgress.value = progress
  }

  setOpacity(opacity: number): void {
    this.material.uniforms.uOpacity.value = opacity
  }

  resize(): void {
    const canvas = this.renderer.domElement
    const width = canvas.clientWidth || window.innerWidth
    const height = canvas.clientHeight || window.innerHeight
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)

    this.renderer.setPixelRatio(ratio)
    this.renderer.setSize(width, height, false)
    this.material.uniforms.uResolution.value.set(width, height)

    this.repaint()
  }

  private repaint(): void {
    const canvas = this.renderer.domElement
    const width = canvas.clientWidth || window.innerWidth
    const height = canvas.clientHeight || window.innerHeight
    const scale = Math.min(window.devicePixelRatio || 1, 2)
    const textureWidth = Math.min(width * scale, MAX_TEXTURE_WIDTH)
    const textureHeight = textureWidth * (height / Math.max(width, 1))

    paintTextTexture(this.textCanvas, textureWidth, textureHeight, this.text)
    this.texture.needsUpdate = true
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.clock.start()
    this.tick()
  }

  stop(): void {
    this.running = false
    cancelAnimationFrame(this.frame)
  }

  private tick = (): void => {
    if (!this.running) return
    this.frame = requestAnimationFrame(this.tick)

    this.pointer.lerp(this.pointerTarget, POINTER_EASE)
    this.pointerStrength += (this.pointerStrengthTarget - this.pointerStrength) * POINTER_EASE
    this.material.uniforms.uPointerStrength.value = this.pointerStrength
    this.material.uniforms.uTime.value = this.clock.getElapsedTime()

    if (this.swap > 0.001) {
      this.swap *= 0.90
      this.material.uniforms.uSwap.value = this.swap
    } else if (this.swap !== 0) {
      this.swap = 0
      this.material.uniforms.uSwap.value = 0
    }

    this.renderer.render(this.scene, this.camera)

    if (!this.painted) {
      this.painted = true
      this.onFirstFrame?.()
    }
  }

  dispose(): void {
    this.stop()
    this.texture.dispose()
    this.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }
}
