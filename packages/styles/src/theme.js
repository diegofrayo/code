let theme = {};

export const getTheme = () => {
  return theme;
};

export const setTheme = t => {
  theme = { ...theme, ...t };
};
