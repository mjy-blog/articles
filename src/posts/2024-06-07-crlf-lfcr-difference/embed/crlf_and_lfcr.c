#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>

static void enable_raw_mode();

int main() {
  enable_raw_mode();
  if (printf("Hello world!\r\n") != 14)
    exit(EXIT_FAILURE);
  if (printf("Hello world!\n\r") != 14)
    exit(EXIT_FAILURE);
}

static struct termios original_termios;

static void disable_raw_mode() {
  if (tcsetattr(STDIN_FILENO, TCSAFLUSH, &original_termios) == -1)
    exit(EXIT_FAILURE);
}

static void enable_raw_mode() {
  if (tcgetattr(STDIN_FILENO, &original_termios) == -1)
    exit(EXIT_FAILURE);
  atexit(disable_raw_mode);
  struct termios raw = original_termios;
  raw.c_oflag &= ~OPOST;
  if (tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw) == -1)
    exit(EXIT_FAILURE);
}
