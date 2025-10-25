interface Testimonial {
  id?: number;
  company: string;
  letterUrl: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const sortedTestimonials = [...testimonials].reverse();

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Все отзывы ({sortedTestimonials.length})
      </h3>
      
      <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <div className="divide-y divide-slate-200">
            {sortedTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id || index} 
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900">
                      {testimonial.company}
                    </h4>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {testimonial.letterUrl ? (
                      <a
                        href={testimonial.letterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="w-32 h-40 border-2 border-slate-300 rounded-lg overflow-hidden hover:border-mint transition-colors shadow-sm">
                          <img 
                            src={testimonial.letterUrl} 
                            alt={`Письмо от ${testimonial.company}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </a>
                    ) : (
                      <div className="w-32 h-40 border-2 border-slate-200 rounded-lg flex items-center justify-center bg-slate-50">
                        <span className="text-xs text-slate-400 text-center px-2">
                          Нет письма
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
