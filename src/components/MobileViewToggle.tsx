import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MobileViewToggle = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (isMobileView) {
      document.documentElement.style.maxWidth = "375px";
      document.documentElement.style.margin = "0 auto";
      document.documentElement.style.boxShadow = "0 0 50px rgba(0,0,0,0.2)";
    } else {
      document.documentElement.style.maxWidth = "";
      document.documentElement.style.margin = "";
      document.documentElement.style.boxShadow = "";
    }
  }, [isMobileView]);

  return (
    <button
      onClick={() => setIsMobileView(!isMobileView)}
      className="fixed top-4 right-4 z-50 bg-mint hover:bg-mint/80 text-slate-900 p-2 rounded-lg shadow-lg transition-all duration-300"
      title={isMobileView ? "Десктоп вид" : "Мобильный вид"}
    >
      <Icon name={isMobileView ? "Monitor" : "Smartphone"} size={20} />
    </button>
  );
};

export default MobileViewToggle;
