import { auth } from "@/auth";
import { ADMIN_EMAIL } from "@/lib/adminEmail";

export async function isAdminAuthed(): Promise<boolean> {
  const session = await auth();
  return session?.user?.email === ADMIN_EMAIL;
}
