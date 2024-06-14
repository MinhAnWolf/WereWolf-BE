import jwt from "jsonwebtoken";

export function genToken(subject: any, time: string) {
  return jwt.sign(
    {
      data: subject,
    },
    "secret",
    { expiresIn: time }
  );
}
