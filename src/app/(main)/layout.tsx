import { Footer } from "@/components/footer/Footer";
import { TopNav } from "@/components/landing/_components";

export default function Layout({children}:{children: React.ReactNode}) {

    return (
        <div className="w-full">
            <TopNav/>
            {children}
            <Footer/>

        </div>
    )

}