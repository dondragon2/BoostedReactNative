export const getThemeColor = (name: string, theme: any) => {
  const value: string = theme[name];
  return value.startsWith('$') ? theme[value.substring(1)] : theme[name];
};

export const substituteThemeColors = (theme: any) => {
  const keys = Object.keys(theme);
  return keys.reduce((prev, curr) => {
    const value = getThemeColor(curr, theme);
    return {
      ...prev,
      [curr]: value,
    };
  }, {});
};

export const createNavigationTheme = (theme: any, dark: boolean) => ({
  dark,
  colors: {
    primary: getThemeColor('color-primary-default', theme),
    background: getThemeColor('background-basic-color-1', theme),
    card: getThemeColor('background-basic-color-1', theme),
    text: getThemeColor('text-basic-color', theme),
    border: getThemeColor('border-basic-color-1', theme),
    notification: getThemeColor('background-basic-color-1', theme),
  },
});
