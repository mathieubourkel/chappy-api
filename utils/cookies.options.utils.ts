export const cookieOptions:{httpOnly: boolean, maxAge: number, secure:boolean} = {
    httpOnly: process.env.NODE_ENV === 'production',
    maxAge:700000000,
    secure: process.env.NODE_ENV === 'production',
  }