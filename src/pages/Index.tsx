import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const services = [
    { icon: "Scale", title: "Гражданское право" },
    { icon: "Building", title: "Корпоративное право" },
    { icon: "FileText", title: "Договорное право" },
    { icon: "Briefcase", title: "Арбитраж" }
  ];

  const testimonials = [
    {
      text: "Профессиональный подход и внимание к деталям.",
      author: "Анна Петрова",
      company: "ООО 'Техносервис'"
    },
    {
      text: "Отличное знание законодательства и оперативность.",
      author: "Михаил Сидоров",
      company: "АО 'Строймонтаж'"
    },
    {
      text: "Помог решить запутанный корпоративный спор.",
      author: "Елена Кузнецова",
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
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), url('https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/e24f0d8c-64c3-482b-8cb7-f17dae1368f5.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
                Алексей Иванов
              </h1>
              <p className="text-lg text-muted-foreground">
                Адвокат с 15-летним опытом
              </p>
            </div>

            <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl animate-slide-up">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/6480ddb2-9c38-47df-98ca-770cb7c7b948.jpg"
                    alt="Адвокат Алексей Иванов"
                    className="w-full h-56 object-cover rounded-lg mb-6"
                  />
                  <div className="space-y-3">
                    <p className="flex items-center gap-3">
                      <Icon name="Phone" size={18} className="text-secondary" />
                      <a href="tel:+79991234567" className="hover:text-secondary transition-colors text-sm">
                        +7 (999) 123-45-67
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Icon name="Mail" size={18} className="text-secondary" />
                      <a href="mailto:lawyer@example.ru" className="hover:text-secondary transition-colors text-sm">
                        lawyer@example.ru
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Icon name="MapPin" size={18} className="text-secondary" />
                      <span className="text-sm">г. Москва, ул. Тверская, д. 1</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 text-primary">Специализация</h2>
                  <div className="space-y-3">
                    {services.map((service, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Icon name={service.icon} size={20} className="text-secondary" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{service.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
                >
                  Записаться на консультацию
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-muted-foreground/50" />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary">
            Отзывы клиентов
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">
            Доверие и результат
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-4 hover:shadow-lg transition-all duration-300 bg-background"
              >
                <Icon name="Quote" size={20} className="text-secondary mb-2" />
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="border-t pt-3">
                  <p className="font-medium text-sm text-primary">{testimonial.author}</p>
                  <p className="text-xs text-secondary">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Мы сотрудничаем</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <div className="w-32 h-16 bg-white rounded shadow flex items-center justify-center p-4 border border-border">
                    <img 
                      src="https://cdn.poehali.dev/projects/d51f7b1a-8a54-4ed4-af0f-610043ace193/files/fcafe6e4-90c4-4175-9f3c-efd55ad0d2ce.jpg"
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs">
            © 2024 Адвокат Алексей Иванов
          </p>
          <p className="text-xs text-white/60 mt-1">
            Лицензия адвоката № 77/123456
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;