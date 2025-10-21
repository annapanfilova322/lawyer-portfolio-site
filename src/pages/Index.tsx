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
        <div className="absolute inset-0 bg-white/75"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <img 
                src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/96b8d9c2-7ecd-40df-b089-2bd12fc3698b.jpg"
                alt="Адвокат Алексей Иванов"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            <div className="space-y-12 lg:pt-8">
              <div className="space-y-4">
                <h1 className="text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-none">
                  АЛЕКСЕЙ<br />ИВАНОВ
                </h1>
                <p className="text-2xl text-muted-foreground font-medium">
                  Адвокат
                </p>
              </div>

              <div className="h-px bg-border"></div>

              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                  Контакты
                </h2>
                <div className="space-y-3 text-lg">
                  <p className="flex items-baseline gap-3">
                    <span className="text-muted-foreground min-w-[120px]">Телефон</span>
                    <a href="tel:+79991234567" className="hover:text-secondary transition-colors font-medium">
                      +7 (999) 123-45-67
                    </a>
                  </p>
                  <p className="flex items-baseline gap-3">
                    <span className="text-muted-foreground min-w-[120px]">Email</span>
                    <a href="mailto:lawyer@example.ru" className="hover:text-secondary transition-colors font-medium">
                      lawyer@example.ru
                    </a>
                  </p>
                  <p className="flex items-baseline gap-3">
                    <span className="text-muted-foreground min-w-[120px]">Адрес</span>
                    <span className="font-medium">г. Москва, ул. Тверская, д. 1</span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-border"></div>

              <div className="space-y-6">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                  Направления деятельности
                </h2>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-4 text-lg group cursor-default"
                    >
                      <div className="w-1 h-1 bg-secondary rounded-full group-hover:w-6 transition-all duration-300"></div>
                      <span className="font-medium group-hover:text-secondary transition-colors">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
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

      <section className="py-24 px-4 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold tracking-tight text-primary">
                  ОТЗЫВЫ
                </h2>
                <div className="h-1 w-16 bg-secondary"></div>
              </div>

              <div className="space-y-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="space-y-4 border-l-2 border-border pl-6 hover:border-secondary transition-colors">
                    <p className="text-lg leading-relaxed text-foreground">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-bold text-primary">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold tracking-tight text-primary">
                  МЫ СОТРУДНИЧАЕМ
                </h2>
                <div className="h-1 w-16 bg-secondary"></div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {partners.map((partner, index) => (
                  <div 
                    key={index} 
                    className="aspect-[3/2] flex items-center justify-center border-2 border-border hover:border-secondary transition-all duration-300 bg-white"
                  >
                    <span className="text-2xl font-bold text-primary/20 hover:text-primary/40 transition-colors">
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