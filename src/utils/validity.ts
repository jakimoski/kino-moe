export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

export const isValidPassword = (password: string) => {
  // At least 6 characters and at least one special character
  const re = /^(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{6,}$/;
  return re.test(password);
};

export const isValidConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};
