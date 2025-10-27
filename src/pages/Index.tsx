import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AdminPanel from "@/components/AdminPanel";
import { siteData } from "@/data";

const Index = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const expertise = [
    {
      title: "Уголовные дела экономической и налоговой направленности",
      icon: "Scale"
    },
    {
      title: "Сопровождение налоговых проверок",
      icon: "FileText"
    },
    {
      title: "Недвижимость. Жилая/коммерция, земельные участки, подбор, оценка рисков, сопровождение сделок",
      icon: "Building2"
    }
  ];

  // ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ siteData
  const [testimonials, setTestimonials] = useState(siteData.testimonials);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState({
    phone: '+7 (999) 123-45-67',
    email: 'lawyer@example.ru',
    address: 'г. Санкт-Петербург'
  });

  const [certificates, setCertificates] = useState({
    skolkovo: siteData.certificates[0]?.drive_link || '',
    compliance: siteData.certificates[1]?.drive_link || ''
  });

  useEffect(() => {
    // ДАННЫЕ УЖЕ ЗАГРУЖЕНЫ ИЗ siteData
    setLoading(false);
  }, []);

  const handleUpdateTestimonials = (updatedTestimonials: any[]) => {
    setTestimonials(updatedTestimonials);
  };

  const handleUpdateContacts = (updatedContacts: any) => {
    setContacts(updatedContacts);
  };

  const handleUpdateCertificates = (updatedCertificates: any) => {
    setCertificates(updatedCertificates);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ОСТАВЬ ВЕСЬ ОСТАЛЬНОЙ КОД БЕЗ ИЗМЕНЕНИЙ */}
      {/* ... весь твой существующий JSX ... */}
    </div>
  );
};

export default Index;
