export const truncateAddress = (address: string) => {
  return address.substr(0, 4) + "..." + address.substring(address.length - 4);
};
