export function isValidation(login: string, password: string) {
   if (login?.length < 4 || password?.length < 4) {
      return false;
   }
   return true;
}
