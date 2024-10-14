'use client';

import { SetStateAction } from 'react';

export type BingoCellProps = 'true' | 'false' | 'IDK';

export type BingoProps = [
  A1: BingoCellProps,
  B1: BingoCellProps,
  C1: BingoCellProps,
  D1: BingoCellProps,
  E1: BingoCellProps,
  A2: BingoCellProps,
  B2: BingoCellProps,
  C2: BingoCellProps,
  D2: BingoCellProps,
  E2: BingoCellProps,
  A3: BingoCellProps,
  B3: BingoCellProps,
  C3: BingoCellProps,
  D3: BingoCellProps,
  E3: BingoCellProps,
  A4: BingoCellProps,
  B4: BingoCellProps,
  C4: BingoCellProps,
  D4: BingoCellProps,
  E4: BingoCellProps,
  A5: BingoCellProps,
  B5: BingoCellProps,
  C5: BingoCellProps,
  D5: BingoCellProps,
  E5: BingoCellProps,
];

export type BingoState = [
  A1: boolean,
  B1: boolean,
  C1: boolean,
  D1: boolean,
  E1: boolean,
  A2: boolean,
  B2: boolean,
  C2: boolean,
  D2: boolean,
  E2: boolean,
  A3: boolean,
  B3: boolean,
  C3: boolean,
  D3: boolean,
  E3: boolean,
  A4: boolean,
  B4: boolean,
  C4: boolean,
  D4: boolean,
  E4: boolean,
  A5: boolean,
  B5: boolean,
  C5: boolean,
  D5: boolean,
  E5: boolean,
];

const LABEL = [
  'A5~E1 대각선은 빙고 줄이 아니다',
  '이 칸은 빙고 줄의 일부가 아니다',
  'A1~E5 대각선은 빙고 줄이다',
  'D4는 색칠되어 있다',
  '이 칸은 빙고 줄의 일부이다',
  'A4는 색칠이 안 되어 있다',
  '모든 방향의 빙고 줄이 존재한다',
  '이 문장은 참이다',
  '17개 이하의 칸이 색칠되어 있다',
  '빙고 줄의 일부인 칸은 짝수 개이다',
  '이 칸은 빙고 줄의 일부이다',
  '색칠된, 빙고가 아닌 칸은 5개 이상이다',
  '이 칸은 색칠되지 않았거나 빙고 줄이다',
  '세로 빙고 줄은 2개 이상이다',
  '빙고 줄의 일부가 아닌 칸은 10개 이상이다',
  'A2는 색칠이 안 되어 있다',
  '제 2행과 D열 중 적어도 하나는 빙고 줄이다',
  'C열에는 색칠된 칸이 3개 이하 있다',
  'D1은 색칠되어 있다',
  '대각선 빙고 줄이 있다',
  'E5는 색칠되어 있다',
  '이 문제의 정답은 1개가 아니다',
  '이 칸은 색칠되어 있다',
  '빙고 줄의 개수는 3개 이상이다',
  'A5는 색칠되어 있다',
] as const;

export interface BingoGridProps {
  props: BingoProps;
  state: BingoState;
  setState: (action: SetStateAction<BingoState>) => void;
}

export function BingoGrid({ props, state, setState }: BingoGridProps) {
  const h = [
    state[0] && state[1] && state[2] && state[3] && state[4],
    state[5] && state[6] && state[7] && state[8] && state[9],
    state[10] && state[11] && state[12] && state[13] && state[14],
    state[15] && state[16] && state[17] && state[18] && state[19],
    state[20] && state[21] && state[22] && state[23] && state[24],
  ];
  const v = [
    state[0] && state[5] && state[10] && state[15] && state[20],
    state[1] && state[6] && state[11] && state[16] && state[21],
    state[2] && state[7] && state[12] && state[17] && state[22],
    state[3] && state[8] && state[13] && state[18] && state[23],
    state[4] && state[9] && state[14] && state[19] && state[24],
  ];
  const s = !!(state[20] && state[16] && state[12] && state[8] && state[4]);
  const q = !!(state[0] && state[6] && state[12] && state[18] && state[24]);
  let hn = 0;
  let vn = 0;
  let c = 0;
  let n = 0;
  let l = 0;
  let t = 0;
  for (let i = 0; i < 5; i++) {
    if (h[i]) hn++;
    if (v[i]) vn++;
    for (let j = 0; j < 5; j++) {
      if (state[i * 5 + j]) {
        if (h[i] || v[j] || (s && i + j == 4) || (q && i == j)) {
          l++;
        } else {
          t++;
        }
        n++;
      }
    }
    if (state[i * 5 + 2]) {
      c++;
    }
  }
  const cond = [
    s,
    h[0] || v[1],
    !q,
    !state[18],
    !(h[0] || v[4] || s),
    state[15],
    !hn || !vn || (!s && !q),
    !state[7],
    n > 17,
    !!(l % 2),
    !(h[2] || v[0]),
    t < 5,
    state[12] && !(s || q || h[2] || v[2]),
    vn < 2,
    25 - l < 10,
    state[5],
    !(h[1] || v[3]),
    c > 3,
    !state[3],
    !s && !q,
    !state[24],
    true,
    !state[22],
    hn + vn + +s + +q < 3,
    !state[20],
  ] as const;

  return (
    <div
      style={{
        width: 'min(100%,  calc(100vh - 3.5rem))',
        aspectRatio: '1 / 1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          width: '100%',
          height: '100%',
          padding: 2,
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: 10,
        }}
      >
        {props.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              setState((state) => {
                const newState = [...state] as BingoState;
                newState[i] = !newState[i];
                return newState;
              })
            }
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              boxSizing: 'border-box',
              border: `0.5rem solid ${
                i === 21 ? 'gray' : cond[i] == state[i] ? 'red' : 'black'
              }`,
              background: state[i] ? 'black' : 'white',
              color: state[i] ? 'white' : 'black',
              outline:
                props[i] === 'IDK'
                  ? undefined
                  : props[i] === 'true'
                  ? '2px solid blue'
                  : '2px solid red',
              fontSize: '1.5vmin',
            }}
          >
            {LABEL[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
