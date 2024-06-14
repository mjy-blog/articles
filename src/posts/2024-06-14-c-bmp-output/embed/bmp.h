#include <stdint.h>
#include <stdbool.h>

typedef struct _bmp_pixel {
  uint8_t r;
  uint8_t g;
  uint8_t b;
} bmp_pixel;

typedef struct _bmp {
  size_t width;
  size_t height;
  bmp_pixel extra[];
} bmp;

/**
 * @brief Serialize bmp
 *
 * @param self target image
 * @param out serialized result
 * @param out_length result length
 * @return true on failure
 * @return false on success
 */
bool serialize_bmp(bmp *self, char **out, size_t *out_length);
