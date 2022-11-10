export function getExpires() {
   return {
      expires: new Date(1000 * 60 * 60 * 5 + Date.now()),
      httpOnly: false,
   };
}
