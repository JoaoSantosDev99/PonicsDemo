export const addressShortener = (address) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const longAddress = (address) => {
  return address.slice(0, 12) + " ... " + address.slice(-12);
};
