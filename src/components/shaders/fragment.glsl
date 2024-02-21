precision highp float;
varying vec2 vUv;
varying float vPattern;
uniform float time;
uniform float averageFrequency;
uniform float pitch;
uniform float amplitude;
uniform float beat;

struct ColorStop {
    vec3 color;
    float position;
};

//  COLOR_RAMP macro
#define COLOR_RAMP(colors, factor, finalColor) { \
    int index = 0; \
    for(int i = 0; i < colors.length() - 1; i++){ \
       ColorStop currentColor = colors[i]; \
       bool isInBetween = currentColor.position <= factor; \
       index = int(mix(float(index), float(i), float(isInBetween))); \
    } \
    ColorStop currentColor = colors[index]; \
    ColorStop nextColor = colors[index + 1]; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
} \


void main() {
    vec3 color;

    vec3 mainColor = vec3(0.4, 0.4, 0.9);

    mainColor.r *= 0.9 + sin(averageFrequency) / 3.2;
    mainColor.g *= 1.1 + cos(averageFrequency / 2.0) / 3.5;
    mainColor.b *= 0.8 + cos(averageFrequency / 1.0) / 4.0;

    mainColor = clamp(mainColor, 0.0, 1.0);

    mainColor += vec3(0.1);  

    ColorStop colors[4] = ColorStop[](
        ColorStop(vec3(0, 0.5, 0), beat),    // Green
        ColorStop(vec3(1, 1, 0), pitch*0.001),      // Yellow
        ColorStop(mainColor, 0.1),
        ColorStop(vec3(0.7, 0, 0), 1.0)      // Red
    );

    COLOR_RAMP(colors, vPattern, color);
    gl_FragColor = vec4(color, 1.0);
}
