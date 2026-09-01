/**
 * Fullscreen quad. Position is already in clip space, so no camera matrices
 * are involved and the vertex stage costs nothing.
 */
export const TYPE_FIELD_VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

/**
 * The lettering is supplied as a coverage texture and never drawn directly.
 * Every pixel is fetched through a warped coordinate, so the type behaves like
 * a material being pushed around rather than text with an effect layered on it.
 */
export const TYPE_FIELD_FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uText;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uProgress;
  uniform float uSwap;
  uniform float uOpacity;
  uniform vec3 uInk;
  uniform vec3 uAccent;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 auv = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.06;

    /* Two-stage domain warp: the slow breathing of the material at rest. */
    vec2 q = vec2(fbm(auv * 1.6 + t), fbm(auv * 1.6 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(auv * 2.4 + q * 1.2 + vec2(1.7, 9.2)),
      fbm(auv * 2.4 + q * 1.2 + vec2(8.3, 2.8))
    );

    float amplitude = 0.010 + uProgress * 0.16 + uSwap * 0.13;
    vec2 warp = (q * 0.6 + r * 0.4) * amplitude;

    /* The cursor is a lens: a local refraction plus a ring travelling out. */
    vec2 pd = (uv - uPointer) * vec2(aspect, 1.0);
    float pdist = length(pd);
    vec2 pdir = pd / max(pdist, 1e-5);
    float lens = exp(-pdist * 8.0) * uPointerStrength;

    warp += pdir * lens * 0.060;
    warp += pdir * sin(pdist * 30.0 - uTime * 2.2) * lens * 0.014;

    /* Colour splits only where the surface is actually bent. */
    float bend = length(warp) * 9.0 + lens * 0.5;
    vec2 split = (warp / max(length(warp), 1e-5)) * bend * 0.007;

    float rC = texture2D(uText, uv + warp + split).a;
    float gC = texture2D(uText, uv + warp).a;
    float bC = texture2D(uText, uv + warp - split).a;

    float coverage = max(rC, max(gC, bC));
    coverage *= 1.0 - smoothstep(0.0, 0.85, uProgress);
    coverage *= 1.0 - uSwap * 0.9;

    vec3 ink = uInk;
    float fringe = clamp(abs(rC - bC) * 2.4, 0.0, 1.0);
    ink = mix(ink, uAccent, fringe);

    /* A soft accent bloom trailing the cursor, visible even off the letters. */
    float glow = exp(-pdist * 4.5) * uPointerStrength * 0.09;

    vec3 color = mix(uAccent, ink, coverage);
    float alpha = max(coverage, glow);

    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`
