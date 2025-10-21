import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
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
        className="min-h-screen flex items-center py-20 px-4 relative"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/9300e63c-58c3-4783-8745-c9279f14edf3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/50"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <img 
                src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/96b8d9c2-7ecd-40df-b089-2bd12fc3698b.jpg"
                alt="Адвокат Алексей Иванов"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            <div className="space-y-12 lg:pt-8 bg-white/90 backdrop-blur-sm p-10 rounded-sm shadow-2xl">
              <div className="space-y-4">
                <h1 className="text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-none drop-shadow-sm">
                  АЛЕКСЕЙ<br />ИВАНОВ
                </h1>
                <p className="text-2xl text-primary/80 font-bold">
                  Адвокат
                </p>
              </div>

              <div className="h-px bg-primary/20"></div>

              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                  Контакты
                </h2>
                <div className="space-y-3 text-lg">
                  <p className="flex items-baseline gap-3">
                    <span className="text-primary/60 min-w-[120px] font-semibold">Телефон</span>
                    <a href="tel:+79991234567" className="hover:text-secondary transition-colors font-bold text-primary">
                      +7 (999) 123-45-67
                    </a>
                  </p>
                  <p className="flex items-baseline gap-3">
                    <span className="text-primary/60 min-w-[120px] font-semibold">Email</span>
                    <a href="mailto:lawyer@example.ru" className="hover:text-secondary transition-colors font-bold text-primary">
                      lawyer@example.ru
                    </a>
                  </p>
                  <p className="flex items-baseline gap-3">
                    <span className="text-primary/60 min-w-[120px] font-semibold">Адрес</span>
                    <span className="font-bold text-primary">г. Москва, ул. Тверская, д. 1</span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-primary/20"></div>

              <div className="space-y-6">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                  Направления деятельности
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((service, index) => (
                    <div 
                      key={index} 
                      className="bg-white border-2 border-primary/10 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 p-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="font-bold text-primary text-base">
                          {service}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-12 py-6 text-base h-auto"
                >
                  ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-white to-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-6xl lg:text-7xl font-bold tracking-tight text-primary">
                  ОТЗЫВЫ
                </h2>
                <div className="h-2 w-24 bg-secondary"></div>
              </div>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-8 border-l-4 border-secondary shadow-lg hover:shadow-2xl hover:border-primary transition-all duration-300">
                    <Icon name="Quote" size={32} className="text-secondary/20 mb-4" />
                    <p className="text-lg leading-relaxed text-primary/90 mb-6">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Icon name="User" size={20} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-lg">{testimonial.author}</p>
                        <p className="text-sm text-secondary font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-6xl lg:text-7xl font-bold tracking-tight text-primary">
                  МЫ СОТРУДНИЧАЕМ
                </h2>
                <div className="h-2 w-24 bg-secondary"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {partners.map((partner, index) => (
                  <div 
                    key={index} 
                    className="aspect-[3/2] flex items-center justify-center border-2 border-primary/20 hover:border-secondary hover:bg-white transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-md hover:shadow-xl group"
                  >
                    <span className="text-2xl font-bold text-primary/30 group-hover:text-secondary group-hover:scale-110 transition-all duration-300">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm font-medium">
                © 2024 АЛЕКСЕЙ ИВАНОВ
              </p>
              <p className="text-sm text-white/60 mt-1">
                Лицензия адвоката № 77/123456
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;