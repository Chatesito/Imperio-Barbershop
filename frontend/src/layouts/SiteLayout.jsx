import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
            <TopBar />
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[100vw] overflow-x-hidden">{children}</main>
            <Footer />
        </div>
    );
}