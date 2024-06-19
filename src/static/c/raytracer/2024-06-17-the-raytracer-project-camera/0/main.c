#include <math.h>
#include <stdint.h>
#include <stdio.h>

#include "../../f3.h"
#include "../../write_image.h"

typedef struct ray {
  f3_t origin;
  f3_t direction;
} ray_t;

typedef struct sphere {
  f3_t center;
  float radius;
} sphere_t;

const float orthogonal_camera_scale = 3.0f;
const f3_t camera_position = {0, 0, 0};
const f3_t camera_direction = {0, 1, 0};
const bmp_pixel_t white = {255, 255, 255};
const sphere_t sphere1 = {{-2, 3, 0}, 1};
const sphere_t sphere2 = {{3, 5, 0}, 1};

static inline float sqr(float x) { return x * x; }

bool collide(ray_t ray, sphere_t sphere, f3_t *out_normal,
             float *out_distance) {
  // 카메라가 구 안에 있는지
  if (f3_length(f3_sub(ray.origin, sphere.center)) < sphere.radius) {
    *out_normal = f3_mul1(ray.direction, -1);
    return true;
  }

  // 편의상 ray와 sphere의 위치에서 sphere의 위치를 빼서 sphere를 원점으로 만듦
  ray.origin = f3_sub(ray.origin, sphere.center);
  sphere.center = f3(0, 0, 0);

  /*
    이제 sphere를 x^2 + y^2 + z^2 - r^2 = 0으로 나타낼 수 있음
    x, y, z는 ray.origin + ray.direction * t의 x, y, z가 됨
    여기서 t는 광선이 이동한 거리, r은 ray.origin

    x^2 + y^2 + z^2 - r^2 = 0이라는 식에서 x^2는 이렇게 다시 쓸 수 있음
    (ray.origin.x + ray.direction.x * t)^2

    편의상 ray.origin을 (a, b, c), ray.direction을 (u, v, w)라고 하면
    (a + ut)^2 + (b + vt)^2 + (c + wt)^2 = r^2이 되고, 이를 풀어 쓰면
    a^2 + 2aut + (ut)^2 + b^2 + 2bvt + (vt)^2 + c^2 + 2cwt + (wt)^2 - r^2 = 0
    이를 만족하는 t를 찾아야 함

    근의 공식에 따라 A𝑥^2 + B𝑥 + C = 0이라고 할 때
    x는 (-B ± sqrt(B^2 - 4AC)) / 2A가 되고,
    여기서 𝑥가 t라고 할 때 a, b, c를 구해서 근의 공식대로 𝑥(=t)를 구하면 된다

    여기서의 A와 B, C를 각각 구하면 다음과 같다
    A = u^2 + v^2 + w^2
    B = 2au + 2bv + 2cw
    C = a^2 + b^2 + c^2
  */
  const float a =
      sqr(ray.direction.x) + sqr(ray.direction.y) + sqr(ray.direction.z);
  const float b =
      2 * (ray.origin.x * ray.direction.x + ray.origin.y * ray.direction.y +
           ray.origin.z * ray.direction.z);
  const float c = sqr(ray.origin.x) + sqr(ray.origin.y) + sqr(ray.origin.z) -
                  sqr(sphere.radius);
  const float discriminant = sqr(b) - 4 * a * c;

  if (discriminant < 0) {
    // 실수 x가 존재하지 않으면 교점이 없는 것, 즉 충돌하지 않음
    return false;
  }
  // 교점이 ± 때문에 두 개가 나오는데, ±가 +이면 뒷면이므로 여기서 ±는 아마도 -
  float t = (-b - sqrtf(discriminant)) / (2 * a);
  if (t < 0) { // 음수인 경우 카메라 뒤쪽이므로 +로 재시도
    t = (-b + sqrtf(discriminant)) / (2 * a);
    if (t < 0) { // 이래도 음수면 결국 충돌 안 한 거
      return false;
    }
  }

  // t를 통해 x^2 + y^2 + z^2 - r^2 = 0애서의 x, y, z를 구할 수 있음
  const float x = ray.origin.x + ray.direction.x * t;
  const float y = ray.origin.y + ray.direction.y * t;
  const float z = ray.origin.z + ray.direction.z * t;

  // x^2 + y^2 + z^2 - r^2를 각각 x, y, z에 대해 편미분하면 법선 벡터가 나옴
  out_normal->x = 2 * x; // f(x) = x^2 + y^2 + z^2, f'(x) = 2x
  out_normal->y = 2 * y; // f(y) = x^2 + y^2 + z^2, f'(y) = 2y
  out_normal->z = 2 * z; // f(z) = x^2 + y^2 + z^2, f'(z) = 2z
  // 하지만 길이가 1이 아닐 수 있으므로 정규화를 해야 함
  *out_normal = f3_normalize(*out_normal);

  *out_distance = t;

  return true;
}

bmp_pixel_t renderer(void *context, float x_on_image, float y_on_image) {
  const float x = (2.0f * x_on_image - 1.0f) * orthogonal_camera_scale;
  // y_on_image는 높을수록 아래인데 z는 높을수록 위이므로, 반대로 처리
  const float z = -(2.0f * y_on_image - 1.0f) * orthogonal_camera_scale;
  const f3_t origin = f3_add(camera_position, f3(x, 0, z));
  const ray_t ray = {origin, camera_direction};

  f3_t normal;
  f3_t normal1;
  f3_t normal2;
  float distance1;
  float distance2;
  const bool collide1 = collide(ray, sphere1, &normal1, &distance1);
  const bool collide2 = collide(ray, sphere2, &normal2, &distance2);
  if (!collide1 && !collide2) {
    return white;
  }
  // 둘 다 교점이 있다면 가까운 것에 부딛힘
  if (!collide1) {
    normal = normal2;
  } else if (!collide2) {
    normal = normal1;
  } else if (distance1 < distance2) {
    normal = normal1;
  } else {
    normal = normal2;
  }
  return (bmp_pixel_t){
      // normal의 각 요소는 -1에서 1 사이이므로, 0에서 255 사이로 만든다
      (uint8_t)((normal.x * 0.5f + 0.5f) * 255 + 0.5f),
      (uint8_t)((normal.y * 0.5f + 0.5f) * 255 + 0.5f),
      (uint8_t)((normal.z * 0.5f + 0.5f) * 255 + 0.5f),
  };
}

int main(int argc, char **argv) {
  if (argc != 2) {
    return 1;
  }

  write_image(argv[1], renderer, NULL, 1024, 1024);
}
