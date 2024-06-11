import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ProfileSetupComponent from "@/components/ProfileSetupComponent/ProfileSetupComponent";

export default async function ProfileSetup() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }
  return (
    <section className="auth-layout__wrapper">
      <ProfileSetupComponent />
    </section>
  );
}
