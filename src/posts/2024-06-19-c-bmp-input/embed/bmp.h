#pragma once

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>

typedef struct bmp_pixel {
  uint8_t r;
  uint8_t g;
  uint8_t b;
} bmp_pixel_t;

typedef struct bmp {
  size_t width;
  size_t height;
  bmp_pixel_t extra[];
} bmp_t;

/**
 * @brief Serialize bmp
 *
 * @param buffer buffer to deserialize
 * @param length length of buffer
 * @param out result
 * @return true on failure
 * @return false on success
 */
bool deserialize_bmp(const void *buf, size_t length, bmp_t **out);
