export function MichaelLoWordmark(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1792 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v256H0V0ZM128 64h64v192h-64V64ZM64 64h64v64H64V64ZM256 0h64v256h-64V0ZM384 0h64v256h-64V0ZM448 64h64v64h-64V64ZM576 0h64v256h-64V0ZM640 64h192v64H640V64ZM832 128h64v128h-64V128ZM960 0h64v256h-64V0ZM1024 64h192v64h-1024V64ZM1216 128h64v128h-64V128ZM1344 0h64v256h-64V0ZM1408 192h384v64h-384v-64Z"
      />
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1792 256"><path fill="${color}" d="M0 0h64v256H0V0ZM128 64h64v192h-64V64ZM64 64h64v64H64V64ZM256 0h64v256h-64V0ZM384 0h64v256h-64V0ZM448 64h64v64h-64V64ZM576 0h64v256h-64V0ZM640 64h192v64H640V64ZM832 128h64v128h-64V128ZM960 0h64v256h-64V0ZM1024 64h192v64h-1024V64ZM1216 128h64v128h-64V128ZM1344 0h64v256h-64V0ZM1408 192h384v64h-384v-64Z"/></svg>`;
}
