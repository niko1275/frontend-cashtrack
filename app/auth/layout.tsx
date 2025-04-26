import { Logo } from "@/components/ui/Logo";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <div className="lg:grid lg:grid-cols-2 lg:min-h-screen"> 
          <div className="flex justify-center bg-purple-950 bg-[url('/grafico.svg')] bg-cover bg-center">

            <div className="w-96 py-10 lg:py-20">
                <Logo/>
              </div>
          </div>
           
            <div className="p-10 lg:py-28 "> 
                <div className="max-w-3xl mx-auto">
                 {children}
                </div>
                
            </div>
        </div>
      <ToastContainer/>
      </>
    );
  }