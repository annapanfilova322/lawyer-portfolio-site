import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AdminPanel from "@/components/AdminPanel";
import MobileViewToggle from "@/components/MobileViewToggle";

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
      title: "Недвижимость. Правовой комплаенс сделок. Коммерция, инвестиции",
      icon: "Building2"
    }
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://functions.poehali.dev/ade328f9-1341-4721-acd7-6241e3ae8c1a';

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTestimonials = (updatedTestimonials: any[]) => {
    setTestimonials(updatedTestimonials);
  };



  return (
    <div className="min-h-screen bg-white">
      <MobileViewToggle />
      <section 
        className="min-h-screen flex items-start py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/7a571db1-b302-4ba8-af75-801353092c60.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-800/70"></div>
        <div className="container mx-auto max-w-7xl relative z-10 pt-12">
          <div className="grid lg:grid-cols-[1fr,300px] gap-16 xl:gap-20 items-start">
            <div className="space-y-8 max-w-4xl mx-auto pt-8">
              <div className="space-y-6">
                <h1 className="text-xl md:text-2xl text-mint font-light tracking-wide uppercase">
                  Адвокат
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Miama Nueva', cursive", color: '#c0f0e0' }}>
                  Панфилова Анна <span className="text-2xl md:text-3xl lg:text-4xl">& Co</span>
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-base md:text-lg text-mint">
                  Налоги, экономика, бизнес
                </p>

                <p className="text-base md:text-lg text-mint">
                  Член адвокатской палаты г. Санкт-Петербурга с 2013 года.
                </p>

                <div className="space-y-6">
                  {expertise.map((item, index) => (
                    <p key={index} className="text-base md:text-lg text-mint">
                      {item.title}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-mint/50 via-mint/20 to-transparent my-8"></div>

              <div className="space-y-5">
                <h2 className="text-lg font-bold tracking-[0.2em] text-mint/80 uppercase">
                  Контакты
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-slate-300 font-medium text-xs uppercase tracking-[0.15em]">Телефон</span>
                    <a href="tel:+79991234567" className="hover:text-mint transition-colors font-bold text-white text-lg">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-slate-300 font-medium text-xs uppercase tracking-[0.15em]">Email</span>
                    <a href="mailto:lawyer@example.ru" className="hover:text-mint transition-colors font-bold text-white text-base break-all">
                      lawyer@example.ru
                    </a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-slate-300 font-medium text-xs uppercase tracking-[0.15em]">Адрес</span>
                    <span className="font-bold text-white text-base">г. Санкт-Петербург</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Miama Nueva', cursive" }}>
                Отзывы
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-slate-500">Загрузка отзывов...</p>
              </div>
            ) : (
              <TestimonialCarousel testimonials={testimonials} />
            )}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-widest uppercase">
                © 2025 Панфилова Анна
              </p>
              <p className="text-xs text-white/60 font-medium">
                Лицензия адвоката № 77/123456
              </p>
            </div>

          </div>
        </div>
      </footer>

      <AdminPanel 
        testimonials={testimonials} 
        onUpdate={handleUpdateTestimonials}
        apiUrl={API_URL}
        onRefresh={fetchTestimonials}
      />

      {showContactModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-white max-w-md w-full p-8 md:p-12 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">
                  ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
                </h3>
                <div className="h-1 w-16 bg-secondary"></div>
              </div>
              
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold tracking-widest text-primary/60 uppercase">
                    Позвоните нам
                  </p>
                  <a 
                    href="tel:+79991234567" 
                    className="block text-3xl font-bold text-secondary hover:text-primary transition-colors"
                  >
                    +7 (999) 123-45-67
                  </a>
                </div>

                <div className="h-px bg-primary/10"></div>

                <div className="space-y-2">
                  <p className="text-xs font-bold tracking-widest text-primary/60 uppercase">
                    Или напишите
                  </p>
                  <a 
                    href="mailto:lawyer@example.ru" 
                    className="block text-lg font-bold text-secondary hover:text-primary transition-colors break-all"
                  >
                    lawyer@example.ru
                  </a>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-primary/60 leading-relaxed">
                    Мы ответим в течение 15 минут в рабочее время
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;