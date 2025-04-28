import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import MainSection from "@/components/MainSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Background />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Navbar />
        <MainSection />
        <Footer />
      </div>
    </div>
  );
}
