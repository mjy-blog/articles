#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>

static void enableRawMode();

int main() {
  if (setvbuf(stdout, NULL, _IOLBF, 4096))
    exit(EXIT_FAILURE);
  enableRawMode();
  if (printf("Hello world!\r\n") != 14)
    exit(EXIT_FAILURE);
  sleep(10);
  if (printf("Hello world!\n\r") != 14)
    exit(EXIT_FAILURE);
  sleep(10);
}

static struct termios original_termios;

static void disableRawMode() {
  if (tcsetattr(STDIN_FILENO, TCSAFLUSH, &original_termios) == -1)
    exit(EXIT_FAILURE);
}

static void enableRawMode() {
  if (tcgetattr(STDIN_FILENO, &original_termios) == -1)
    exit (EXIT_FAILURE);
  atexit(disableRawMode);
  struct termios raw = original_termios;
  raw.c_iflag &= ~(BRKINT | ICRNL | INPCK | ISTRIP | IXON);
  raw.c_oflag &= ~(OPOST);
  raw.c_cflag |= (CS8);
  raw.c_lflag &= ~(ECHO | ICANON | IEXTEN | ISIG);
  raw.c_cc[VMIN] = 0;
  raw.c_cc[VTIME] = 1;
  if (tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw) == -1)
    exit (EXIT_FAILURE);
}
