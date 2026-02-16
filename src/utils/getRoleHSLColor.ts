export const getRoleHSLColor = (hue: number) => {
  const normalizedHue = Math.max(0, Math.min(hue, 360));

  return `hsl(${normalizedHue}deg 100% 50%)`;
};
