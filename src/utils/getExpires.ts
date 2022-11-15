const hours = 48;

export function getExpires() {
   return {
      expires: new Date(1000 * 60 * 60 * hours + Date.now()),
      httpOnly: false,
   };
}
