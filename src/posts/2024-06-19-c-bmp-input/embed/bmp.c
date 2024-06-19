#include "bmp.h"

#include <stdlib.h>

static uint16_t u16_to_le(uint16_t u16) {
  const uint16_t test = 42;
  const char *const source = (const char *)&u16;
  uint16_t result;
  char *const dest = (char *)&result;

  if (*((char *)&test))
    return (u16);
  dest[0] = source[1];
  dest[1] = source[0];
  return (result);
}

static uint32_t u32_to_le(uint32_t u32) {
  const uint32_t test = 42;
  const char *const source = (const char *)&u32;
  uint32_t result;
  char *const dest = (char *)&result;

  if (*((char *)&test))
    return (u32);
  dest[0] = source[3];
  dest[1] = source[2];
  dest[2] = source[1];
  dest[3] = source[0];
  return (result);
}

bool deserialize_bmp(const void *buf, size_t length, bmp_t **out) {
  const char *const str = buf;

  if (length <= 54 || str[0] != 'B' || str[1] != 'M' ||
      u16_to_le(*((uint16_t *)&str[28])) != 24 ||
      u32_to_le(*((uint32_t *)&str[30])) != 0)
    return (true);

  size_t offset = *((uint32_t *)&str[10]);
  int64_t width = (int32_t)u32_to_le(*((uint32_t *)&str[18]));
  bool width_reversed = width < 0;
  if (width_reversed) {
    width = -width;
  }
  int64_t height = (int32_t)u32_to_le(*((uint32_t *)&str[22]));
  bool height_reversed = height < 0;
  if (height_reversed) {
    height = -height;
  }
  size_t row_padding = (4 - (width * 3) % 4) % 4;
  size_t row_size = width * 3 + row_padding;
  size_t whole_size = row_size * height - row_padding;

  if (length < offset + whole_size)
    return (true);

  bmp_t *const result =
      malloc(sizeof(bmp_t) + sizeof(bmp_pixel_t) * width * height);
  if (!result) {
    return true;
  }

  result->width = width;
  result->height = height;

  const uint8_t *arr = buf + offset;
  for (size_t y = 0; y < height; y++) {
    for (size_t x = 0; x < width; x++) {
      size_t actual_x = x;
      size_t actual_y = y;
      if (width_reversed)
        actual_x = width - 1 - x;
      if (!height_reversed)
        actual_y = height - 1 - y;
      result->extra[actual_y * width + actual_x].r =
          arr[y * row_size + x * 3 + 2];
      result->extra[actual_y * width + actual_x].g =
          arr[y * row_size + x * 3 + 1];
      result->extra[actual_y * width + actual_x].b = arr[y * row_size + x * 3];
    }
  }

  *out = result;
  return false;
}
