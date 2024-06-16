#include <stdio.h>
#include <stdlib.h>

#include "bmp.h"

static char buf[256 * 256 * 3 + sizeof(bmp_t)];

int main(int argc, char *argv[]) {
  // arguments validation
  if (argc != 2)
    exit(EXIT_FAILURE);

  // dummy image
  bmp_t *bmp = (void *)&buf[0];
  bmp->width = 256;
  bmp->height = 256;
  for (size_t i = 0; i < 256; i++) {
    for (size_t j = 0; j < 256; j++) {
      size_t index = i * 256 + j;
      bmp->extra[index].r = i;
      bmp->extra[index].g = j;
      bmp->extra[index].b = 255;
    }
  }

  // serialize
  char *result;
  size_t length;
  if (serialize_bmp(bmp, &result, &length)) {
    exit(EXIT_FAILURE);
  }

  // print
  FILE *fp = fopen(argv[1], "wb");
  if (!fp)
    exit(EXIT_FAILURE);
  if (fwrite(result, 1, length, fp) != length)
    exit(EXIT_FAILURE);
}
