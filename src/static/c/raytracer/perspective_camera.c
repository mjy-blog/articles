#include "camera.h"

typedef struct perspective_camera {
  f3_t x;
  f3_t y;
  f3_t z;
  float tan_fov_x;
  float tan_fov_y;
  f3_t origin;
} perspective_camera_t;

camera_t perspective_camera(f3_t camera_position, float yaw, float pitch,
                            float roll, float aspect_ratio,
                            camera_fov_mode_t fov_mode, float fov) {
  //
}
