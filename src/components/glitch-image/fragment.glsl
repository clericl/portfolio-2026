// r3f/drei 'Image' compounded with 'day4_1 glitch effect' by kiyoshidainagon
// https://www.shadertoy.com/view/4tyfDR

// mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
varying vec2 vUv;
varying vec2 vPos;
uniform vec2 scale;
uniform vec2 imageBounds;
uniform float resolution;
uniform vec3 color;
uniform sampler2D map;
uniform float radius;
uniform float zoom;
uniform float grayscale;
uniform float opacity;

uniform float seed;
uniform float uTime;

const vec3 luma = vec3(.299, 0.587, 0.114);
vec4 toGrayscale(vec4 color, float intensity) {
  return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
}
vec2 aspect(vec2 size) {
  return size / min(size.x, size.y);
}

const float PI = 3.14159265;
  
// from https://iquilezles.org/articles/distfunctions
float udRoundBox( vec2 p, vec2 b, float r ) {
  return length(max(abs(p)-b+r,0.0))-r;
}

float rand(vec2 p)
{
    float t = floor(uTime * seed) / 10.;
    return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);
}

float noise(vec2 uv, float blockiness)
{   
    vec2 lv = fract(uv);
    vec2 id = floor(uv);
    
    float n1 = rand(id);
    float n2 = rand(id+vec2(1,0));
    float n3 = rand(id+vec2(0,1));
    float n4 = rand(id+vec2(1,1));
    
    vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);

    return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);
}

float fbm(vec2 uv, int count, float blockiness, float complexity)
{
    float val = 0.0;
    float amp = 0.5;
    
    while(count != 0)
    {
    	val += amp * noise(uv, blockiness);
        amp *= 0.5;
        uv *= complexity;    
        count--;
    }
    
    return val;
}

const float glitchAmplitude = 0.5; // increase this
const float glitchNarrowness = 4.0;
const float glitchBlockiness = 2.0;
const float glitchMinimizer = 16.0; // decrease this

void main() {
  if (vUv.x < 0.005 || vUv.y < 0.005 || vUv.x > 0.995 || vUv.y > 0.995) {
    discard;
  }

  vec2 s = aspect(scale);
  vec2 i = aspect(imageBounds);
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 uv = vUv * s / new + offset;
  vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

  vec2 res = vec2(scale * resolution);
  vec2 halfRes = 0.5 * res;
  float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));

  vec4 imageColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);

  vec2 uv2 = vec2(zUv.x, exp(zUv.y));
  float shift = glitchAmplitude * pow(fbm(uv2, 4, glitchBlockiness, glitchNarrowness), glitchMinimizer);

  float cR = texture(map, vec2(zUv.x + shift, zUv.y)).r * (1. - shift);
  float cG = texture(map, vec2(zUv.x - shift, zUv.y)).g * (1. - shift);
  float cB = texture(map, vec2(zUv.x - shift, zUv.y)).b * (1. - shift);

  vec4 shiftedColor = vec4(cR, cG, cB, 1.);

  gl_FragColor = toGrayscale(shiftedColor * vec4(color, opacity * a), grayscale);
  // gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
