export const passRegEx = new RegExp(
  "^.{8,}",
);

export const mailRegex =
  /^[a-zA-Z0-9._%+-]+@(?:gmail.com|yahoo.com|outlook.com|hotmail.com|icloud.com|protonmail.com|aol.com|zoho.com)$/i;

export const mediumValidPass = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");
