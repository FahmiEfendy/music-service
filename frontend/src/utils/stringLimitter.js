const stringLimitter = (string) => {
  const maxChar = 15;

  return `${string.slice(0, maxChar)}...`;
};

export default stringLimitter;
