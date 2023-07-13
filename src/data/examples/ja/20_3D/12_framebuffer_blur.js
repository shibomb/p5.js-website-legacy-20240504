/*
 * @name フレームバッファの深さによるボケ
 * @frame 710,400
 * @arialabel カメラの前で回転する5つの球体が並び、近くや遠くがぼけて見えます。
 * @description p5.Framebufferからの深度情報を使用して、
 * フォーカルブラーでシーンを描画するシェーダーです。
 */
let layer;
let blur;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  layer = createFramebuffer();
  blur = createShader(vert, frag);
  noStroke();
}

function draw() {
  // シーンを描きます。
  layer.begin();
  background(255);
  ambientLight(100);
  directionalLight(255, 255, 255, -1, 1, -1);
  ambientMaterial(255, 0, 0);
  fill(255, 255, 100);
  specularMaterial(255);
  shininess(150);
  
  rotateY(millis() * 0.001);
  for (let i = 0; i < 5; i++) {
    push();
    translate((i-2)*100, 0, 0);
    sphere();
    pop();
  }
  layer.end();
  
  // 被写界深度でぼかしたシーンをレンダリングします。
  shader(blur);
  blur.setUniform('img', layer.color);
  blur.setUniform('depth', layer.depth);
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let vert = `
precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  positionVec4.y *= -1.0;
  gl_Position = positionVec4;
  vTexCoord = aTexCoord;
}`;

let frag = `
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D img;
uniform sampler2D depth;
float getBlurriness(float d) {
  // depth=0.9 で焦点から
  // 離れるほどぼけます。
  return abs(d - 0.9) * 40.;
}
float maxBlurDistance(float blurriness) {
  return blurriness * 0.01;
}
void main() {
  vec4 color = texture2D(img, vTexCoord);
  float samples = 1.;
  float centerDepth = texture2D(depth, vTexCoord).r;
  float blurriness = getBlurriness(centerDepth);
  for (int sample = 0; sample < 20; sample++) {
    // 現在のピクセルかららせん状に
    // 近傍のピクセルをサンプリングします。
    float angle = float(sample);
    float distance = float(sample)/20.
      * maxBlurDistance(blurriness);
    vec2 offset = vec2(cos(angle), sin(angle)) * distance;

    // 近くのピクセルの物体はどのくらい近いか？
    float sampleDepth = texture2D(depth, vTexCoord + offset).r;

    // そのボケはどこまで届くべきか？
    float sampleBlurDistance =
      maxBlurDistance(getBlurriness(sampleDepth));

    // そのピクセルが現在のピクセルの前にある場合、またはそのピクセルのボケが
    // 現在のピクセルと重なる場合、そのピクセルの色を平均値に加えます。
    if (
      sampleDepth >= centerDepth ||
      sampleBlurDistance >= distance
    ) {
      color += texture2D(img, vTexCoord + offset);
      samples++;
    }
  }
  color /= samples;
  gl_FragColor = color;
}`;
