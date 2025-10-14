import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
            <TopBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}