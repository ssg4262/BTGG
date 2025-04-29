export const darkenColor = (rgb: string, amount: number) => {
    const match = rgb.match(/\d+/g);
    if (!match) return rgb;

    const [r, g, b] = match.map(Number);
    const factor = 1 - amount;

    return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
};