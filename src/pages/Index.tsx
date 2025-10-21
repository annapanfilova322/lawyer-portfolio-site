import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const services = [
    "Уголовное право",
    "Гражданское право",
    "Недвижимость и сделки",
    "Корпоративные споры"
  ];

  const testimonials = [
    {
      text: "Профессиональный подход к делу. Алексей помог выиграть сложный корпоративный спор.",
      author: "Анна Петрова",
      company: "Генеральный директор"
    },
    {
      text: "Рекомендую как надёжного специалиста. Всё чётко, быстро и по делу.",
      author: "Михаил Сидоров",
      company: "Предприниматель"
    },
    {
      text: "Благодарен за помощь в сделке с недвижимостью. Всё прошло без единой проблемы.",
      author: "Елена Кузнецова",
      company: "Частный клиент"
    }
  ];

  const partners = [
    "СБЕР",
    "ГАЗПРОМ",
    "РОСАТОМ",
    "РЖД",
    "ЛУКОЙЛ",
    "ВТБ"
  ];

  return (
    <div className="min-h-screen bg-white">
      <section 
        className="min-h-screen flex items-center py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/9300e63c-58c3-4783-8745-c9279f14edf3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/60"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-[500px,1fr] gap-12 xl:gap-20 items-center">
            <div className="space-y-8">
              <div className="relative overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/96b8d9c2-7ecd-40df-b089-2bd12fc3698b.jpg"
                  alt="Адвокат Алексей Иванов"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>

            <div className="space-y-10 bg-white/95 backdrop-blur-md p-8 md:p-12 lg:p-14 shadow-2xl border border-primary/5">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[0.95]">
                  АЛЕКСЕЙ<br />ИВАНОВ
                </h1>
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-0.5 w-12 bg-secondary"></div>
                  <p className="text-xl md:text-2xl text-primary/70 font-medium tracking-wide">
                    Адвокат
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  Контакты
                </h2>
                <div className="space-y-5 text-base">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">Телефон</span>
                    <a href="tel:+79991234567" className="hover:text-secondary transition-colors font-bold text-primary text-xl">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">Email</span>
                    <a href="mailto:lawyer@example.ru" className="hover:text-secondary transition-colors font-bold text-primary text-lg break-all">
                      lawyer@example.ru
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">Адрес</span>
                    <span className="font-bold text-primary text-lg">г. Москва, ул. Тверская, д. 1</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

              <div className="space-y-5">
                <h2 className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  Направления деятельности
                </h2>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 group cursor-default py-2 border-l-2 border-transparent hover:border-secondary transition-all duration-300 pl-4"
                    >
                      <div className="w-1.5 h-1.5 bg-secondary/60 group-hover:bg-secondary group-hover:scale-125 transition-all duration-300 flex-shrink-0"></div>
                      <span className="font-semibold text-primary/90 group-hover:text-secondary transition-colors text-base">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-bold px-10 py-6 text-sm tracking-widest uppercase h-auto transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Записаться на консультацию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary break-words">
                  ОТЗЫВЫ
                </h2>
                <div className="h-1 w-20 bg-secondary"></div>
              </div>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-8 md:p-10 border-l-4 border-secondary/40 hover:border-secondary shadow-md hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <Icon name="Quote" size={36} className="text-secondary/20 group-hover:text-secondary/40 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-primary/80 mb-8 font-normal">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-primary/5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={20} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-base md:text-lg">{testimonial.author}</p>
                        <p className="text-xs md:text-sm text-secondary font-medium tracking-wide">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary break-words leading-tight">
                  МЫ<br/>СОТРУДНИЧАЕМ
                </h2>
                <div className="h-1 w-20 bg-secondary"></div>
              </div>

              <div className="grid grid-cols-2 gap-5 md:gap-6">
                {partners.map((partner, index) => (
                  <div 
                    key={index} 
                    className="aspect-[3/2] flex items-center justify-center border border-primary/10 hover:border-secondary transition-all duration-500 bg-white shadow-sm hover:shadow-xl group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:to-secondary/10 transition-all duration-500"></div>
                    <span className="text-xl md:text-2xl font-bold text-primary/25 group-hover:text-secondary/70 transition-all duration-500 group-hover:scale-105 relative z-10">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-widest uppercase">
                © 2024 АЛЕКСЕЙ ИВАНОВ
              </p>
              <p className="text-xs text-white/60 font-medium">
                Лицензия адвоката № 77/123456
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary transition-colors p-2 hover:scale-110 transition-transform duration-300">
                <Icon name="Linkedin" size={22} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors p-2 hover:scale-110 transition-transform duration-300">
                <Icon name="Mail" size={22} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors p-2 hover:scale-110 transition-transform duration-300">
                <Icon name="Phone" size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>

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
