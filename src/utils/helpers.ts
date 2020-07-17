export const filterByFeatured = (array: any[]) => {
  return array.filter((a) => a.featured === true);
};

export const hyphenate = (str: string) => {
  return str.split(' ').join('-').toLowerCase();
};

export const deHyphenate = (str: string) => {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
};
