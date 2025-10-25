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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-full px-4">
              <div className="bg-white border-2 border-slate-200 hover:border-amber-400 p-6 transition-all duration-300 group hover:shadow-xl max-w-sm mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center h-16">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/10 flex items-center justify-center">
                      <Icon name="Building2" size={24} className="text-amber-500" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {testimonial.company}
                    </h3>
                  </div>

                  {testimonial.letterUrl ? (
                    <a 
                      href={testimonial.letterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 transition-colors text-sm uppercase tracking-wide"
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

      {testimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-amber-400 text-slate-900 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-amber-400 text-slate-900 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-amber-500 w-8' : 'bg-slate-300'
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
