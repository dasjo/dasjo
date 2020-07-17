export const filterByFeatured = (array: any[]) => {
  return array.filter((a) => a.featured === true);
};

export const hyphenate = (str: string) =>
  str.split(' ').join('-').toLowerCase();
