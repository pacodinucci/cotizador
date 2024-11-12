"use server";

import { signOut } from "../auth";

export const logout = async () => {
  // some server stuff, example: clearing some information about the user...
  await signOut();
};
