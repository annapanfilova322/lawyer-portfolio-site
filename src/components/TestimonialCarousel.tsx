import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Testimonial {
  company: string;
  letterUrl: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 1;
  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="overflow-hidden max-h-[500px]">
        <div 
          className="flex flex-col transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-h-[500px] flex items-center justify-center py-8">
              <div className="bg-white border-2 border-slate-200 hover:border-mint p-8 transition-all duration-300 group hover:shadow-xl w-full max-w-md">
                <div className="space-y-6">
                  <div className="flex items-center justify-center h-20">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mint/20 to-mint/10 flex items-center justify-center">
                      <Icon name="Building2" size={28} className="text-mint" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">
                      {testimonial.company}
                    </h3>
                  </div>

                  {testimonial.letterUrl ? (
                    <a 
                      href={testimonial.letterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-mint hover:bg-mint/80 text-white font-semibold py-3 px-4 transition-colors text-sm uppercase tracking-wide"
                    >
                      <Icon name="FileText" size={18} />
                      <span>Открыть письмо</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-400 font-semibold py-3 px-4 text-sm uppercase tracking-wide cursor-not-allowed">
                      <Icon name="FileText" size={18} />
                      <span>Письмо не добавлено</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-4 bg-white hover:bg-mint text-slate-900 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronUp" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-4 bg-white hover:bg-mint text-slate-900 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronDown" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-mint h-8' : 'bg-slate-300'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialCarousel;