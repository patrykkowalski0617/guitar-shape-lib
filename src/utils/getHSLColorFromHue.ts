export const getHSLColorFromHue = (hue: number) => {
  const normalizedHue = Math.max(0, Math.min(hue, 360));

  return `hsl(${normalizedHue}deg 90% 45%)`;
};
