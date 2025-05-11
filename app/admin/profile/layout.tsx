
import ProfileTabs from "@/components/perfil/PerfilOpciones";
import ToastNotification from "@/components/ui/ToastNotification";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <ProfileTabs />
        {children}
        <ToastNotification />
    </>
  );
}