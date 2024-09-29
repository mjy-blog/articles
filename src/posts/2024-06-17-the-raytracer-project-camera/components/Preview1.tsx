'use client';

import { InteractiveCanvas } from '../../../common/components/interactiveCanvas/InteractiveCanvas';
import { InteractiveCanvasOptionDescriptor } from '../../../common/components/interactiveCanvas/InteractiveCanvasOptionDescriptor';
import { add } from '../../../common/projectSpecific/raytracer/add';
import { Direction } from '../../../common/projectSpecific/raytracer/Direction';
import { Position } from '../../../common/projectSpecific/raytracer/Position';
import { Ray } from '../../../common/projectSpecific/raytracer/Ray';
import { Sphere } from '../../../common/projectSpecific/raytracer/Sphere';
import { sphereCollide } from '../../../common/projectSpecific/raytracer/sphereCollide';

interface State {}

const options: InteractiveCanvasOptionDescriptor<State> = {};

export function Preview1() {
  return <InteractiveCanvas options={options} render={render} />;
}

const size = 512;

const orthogonalCameraScale = 3;
const cameraPosition: Position = [0, 0, 0];
const cameraDirection: Direction = [0, 1, 0];
const spheres: Sphere[] = [
  { center: [-2, 3, 0], radius: 1 },
  { center: [3, 5, 0], radius: 1 },
  { center: [0, 5, 0], radius: 0.1 },
];

function render(state: State): ImageData {
  const data = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = renderPixel(
        x / (size - 1),
        y / (size - 1),
        orthogonalCameraScale,
        cameraPosition,
        cameraDirection,
        spheres,
      );

      data[(y * size + x) * 4] = r;
      data[(y * size + x) * 4 + 1] = g;
      data[(y * size + x) * 4 + 2] = b;
      data[(y * size + x) * 4 + 3] = 255;
    }
  }
  return new ImageData(data, size, size);
}

function renderPixel(
  xOnImage: number,
  yOnImage: number,
  orthogonalCameraScale: number,
  cameraPosition: Position,
  cameraDirection: Direction,
  spheres: Sphere[],
): [r: number, g: number, b: number] {
  const x = (2 * xOnImage - 1) * orthogonalCameraScale;
  const z = -(2 * yOnImage - 1) * orthogonalCameraScale;
  const origin = add(cameraPosition, [x, 0, z]);
  const ray: Ray = { origin, direction: cameraDirection };

  let collide: ReturnType<typeof sphereCollide>;
  for (const sphere of spheres) {
    const tmp = sphereCollide(ray, sphere);
    if (tmp) {
      if (!collide || collide[1] < tmp[1]) {
        collide = tmp;
      }
    }
  }

  const normal = collide ? collide[0] : [0, 0, 0];

  return [
    Math.floor((normal[0] * 0.5 + 0.5) * 255 + 0.5),
    Math.floor((normal[1] * 0.5 + 0.5) * 255 + 0.5),
    Math.floor((normal[2] * 0.5 + 0.5) * 255 + 0.5),
  ];
}
