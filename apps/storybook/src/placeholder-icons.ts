const svg = (path: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;

export const arrowRight = svg(
  'M5 11h11.586L12.293 6.707l1.414-1.414L20.414 12l-6.707 6.707-1.414-1.414L16.586 13H5z',
);

export const check = svg(
  'M5.707 11.793L9.5 15.586l8.793-8.793 1.414 1.414L9.5 18.414l-5.207-5.207z',
);

export const plus = svg('M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z');

