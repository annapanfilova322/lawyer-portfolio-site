import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const services = [
    { icon: "Scale", title: "Гражданское право", description: "Защита прав в спорах с физическими лицами" },
    { icon: "Building", title: "Корпоративное право", description: "Юридическое сопровождение бизнеса" },
    { icon: "FileText", title: "Договорное право", description: "Составление и экспертиза договоров" },
    { icon: "Briefcase", title: "Арбитраж", description: "Представительство в судебных процессах" }
  ];

  const testimonials = [
    {
      text: "Профессиональный подход и внимание к деталям. Благодаря грамотной защите удалось выиграть сложное дело.",
      author: "Анна Петрова",
      position: "Генеральный директор",
      company: "ООО 'Техносервис'"
    },
    {
      text: "Отличное знание законодательства и оперативность в работе. Рекомендую как надёжного юриста.",
      author: "Михаил Сидоров",
      position: "Руководитель юридического отдела",
      company: "АО 'Строймонтаж'"
    },
    {
      text: "Помог решить запутанный корпоративный спор. Всегда на связи, чёткие консультации.",
      author: "Елена Кузнецова",
      position: "Владелец бизнеса",
      company: "ИП Кузнецова Е.В."
    }
  ];

  const partners = [
    { name: "ООО 'Техносервис'" },
    { name: "АО 'Строймонтаж'" },
    { name: "ИП Кузнецова Е.В." }
  ];

  return (
    <div className="min-h-screen">
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.75), rgba(26, 31, 44, 0.75)), url('https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/6b59b512-7615-4415-aac3-27b5b1a88098.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Алексей Иванов
              </h1>
              <p className="text-xl md:text-2xl text-secondary font-medium">
                Адвокат с 15-летним опытом
              </p>
              
              <div className="space-y-3 text-lg">
                <p className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-secondary" />
                  <a href="tel:+79991234567" className="hover:text-secondary transition-colors">
                    +7 (999) 123-45-67
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-secondary" />
                  <a href="mailto:lawyer@example.ru" className="hover:text-secondary transition-colors">
                    lawyer@example.ru
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-secondary" />
                  <span>г. Москва, ул. Тверская, д. 1</span>
                </p>
              </div>

              <Button 
                size="lg" 
                className="mt-8 bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg px-8 py-6"
              >
                Записаться на консультацию
              </Button>
            </div>

            <div className="animate-slide-up">
              <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/6480ddb2-9c38-47df-98ca-770cb7c7b948.jpg"
                  alt="Адвокат Алексей Иванов"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-bold mb-6 text-primary">Специализация</h2>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                          <Icon name={service.icon} size={24} className="text-secondary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-white/70" />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Отзывы клиентов
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Доверие и результат — основа нашей работы
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <div className="mb-4">
                  <Icon name="Quote" size={32} className="text-secondary" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  <p className="text-sm font-medium text-secondary mt-1">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8 text-primary">Мы сотрудничаем</h3>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <div className="w-48 h-24 bg-white rounded-lg shadow-md flex items-center justify-center p-6 border border-border">
                    <img 
                      src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/fcafe6e4-90c4-4175-9f3c-efd55ad0d2ce.jpg"
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Адвокат Алексей Иванов. Все права защищены.
          </p>
          <p className="text-xs text-white/70 mt-2">
            Лицензия адвоката № 77/123456 от 15.03.2009
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
