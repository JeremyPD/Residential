export const validateCedula = (cedula: string) => {
  return /^[0-9]{6,10}$/.test(cedula);
};
