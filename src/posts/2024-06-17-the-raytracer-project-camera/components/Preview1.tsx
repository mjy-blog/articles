'use client';

import { ComponentType } from 'react';
import { InteractiveCanvas } from '../../../common/components/interactiveCanvas/InteractiveCanvas';
import {
  InteractiveCanvasOptionDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from '../../../common/components/interactiveCanvas/InteractiveCanvasOptionDescriptor';
import { floatOption } from '../../../common/components/interactiveCanvas/option/floatOption';
import { integerOption } from '../../../common/components/interactiveCanvas/option/integerOption';
import { add } from '../../../common/projectSpecific/raytracer/add';
import { Direction } from '../../../common/projectSpecific/raytracer/Direction';
import { Position } from '../../../common/projectSpecific/raytracer/Position';
import { Ray } from '../../../common/projectSpecific/raytracer/Ray';
import { Sphere } from '../../../common/projectSpecific/raytracer/Sphere';
import { sphereCollide } from '../../../common/projectSpecific/raytracer/sphereCollide';

interface State {
  '1-size': number;
  '2-orthogonal-camera-scale': number;
  '3-camera-position': Position;
  '4-camera-direction': Direction;
  '5-spheres': Sphere[];
}

const component: ComponentType<
  InteractiveCanvasOptionItemDescriptorComponentProps<any>
> = function () {
  return <div>// TODO</div>;
};

const options: InteractiveCanvasOptionDescriptor<State> = {
  '1-size': integerOption('이미지 크기', 512),
  '2-orthogonal-camera-scale': floatOption('직교 카메라 크기', 3),
  '3-camera-position': {
    displayName: 'camera position',
    defaultValue: [0, 0, 0],
    component,
  },
  '4-camera-direction': {
    displayName: 'camera direction',
    defaultValue: [0, 1, 0],
    component,
  },
  '5-spheres': {
    displayName: 'spheres',
    defaultValue: [
      { center: [-2, 3, 0], radius: 1 },
      { center: [3, 5, 0], radius: 1 },
      { center: [0, 5, 0], radius: 0.1 },
    ],
    component,
  },
};

export function Preview1() {
  return <InteractiveCanvas options={options} render={render} />;
}

function render({
  '1-size': size,
  '2-orthogonal-camera-scale': orthogonalCameraScale,
  '3-camera-position': cameraPosition,
  '4-camera-direction': cameraDirection,
  '5-spheres': spheres,
}: State): ImageData {
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
