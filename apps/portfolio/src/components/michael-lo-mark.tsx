export function MichaelLoMark(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v256H0V0ZM128 64h64v192h-64V64ZM64 64h64v64H64V64ZM256 0h64v256h-64V0ZM320 192h192v64H320v-64Z"
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 256"><path fill="${color}" d="M0 0h64v256H0V0ZM128 64h64v192h-64V64ZM64 64h64v64H64V64ZM256 0h64v256h-64V0ZM320 192h192v64H320v-64Z"/></svg>`;
}
