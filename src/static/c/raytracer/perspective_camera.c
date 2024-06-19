#include "camera.h"

#include <math.h>

#include "f3x3.h"
#include "util.h"

typedef struct perspective_camera_context {
  float tan_fov_x;
  float tan_fov_y;
  f3_t origin;
  f3x3_t rotation;
} perspective_camera_context_t;

static ray_t get_ray(void *context, float x, float y) {
  perspective_camera_context_t *const ctx = context;
  const float direction_x = ctx->tan_fov_x * (x * 2.0f - 1.0f);
  const float direction_y = 1.0f;
  const float direction_z = -ctx->tan_fov_y * (y * 2.0f - 1.0f);
  const f3_t direction = {direction_x, direction_y, direction_z};
  const f3_t normal = f3_normalize(direction);
  const f3_t rotated = f3x3_mul_f3(ctx->rotation, normal);
  const ray_t result = {ctx->origin, rotated};
  return result;
}

static void calculate_fov_x(float aspect_ratio, float fov_x,
                            float *out_tan_fov_x, float *out_tan_fov_y) {
  const float half_fov_x = fov_x / 2;
  *out_tan_fov_x = tanf(half_fov_x);
  *out_tan_fov_y = *out_tan_fov_x / aspect_ratio;
}

static void calculate_fov_y(float aspect_ratio, float fov_y,
                            float *out_tan_fov_x, float *out_tan_fov_y) {
  const float half_fov_y = fov_y / 2;
  *out_tan_fov_y = tanf(half_fov_y);
  *out_tan_fov_x = *out_tan_fov_y * aspect_ratio;
}

camera_t perspective_camera(f3_t camera_position, float yaw, float pitch,
                            float roll, float aspect_ratio,
                            camera_fov_mode_t fov_mode, float fov) {
  perspective_camera_context_t context;
  if (fov_mode == FOV_X) {
    calculate_fov_x(aspect_ratio, fov, &context.tan_fov_x, &context.tan_fov_y);
  } else {
    calculate_fov_y(aspect_ratio, fov, &context.tan_fov_x, &context.tan_fov_y);
  }
  context.origin = camera_position;
  context.rotation = f3x3_rotate(-yaw, -pitch, -roll);
  const camera_t result = {memdup(&context, sizeof(context)), get_ray};
  return result;
}
