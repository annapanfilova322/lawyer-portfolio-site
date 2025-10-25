interface Testimonial {
  id?: number;
  company: string;
  letterUrl: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Все отзывы ({testimonials.length})
      </h3>
      
      <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <div className="divide-y divide-slate-200">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id || index} 
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                        className="inline-block w-full sm:w-auto"
                      >
                        <button className="w-full sm:w-auto px-4 py-2 bg-mint text-slate-900 text-xs font-semibold rounded-md hover:bg-mint/90 transition-colors shadow-sm">
                          Открыть отзыв
                        </button>
                      </a>
                    ) : (
                      <button className="w-full sm:w-auto px-4 py-2 bg-mint text-slate-900 text-xs font-semibold rounded-md hover:bg-mint/90 transition-colors shadow-sm">
                        Открыть отзыв
                      </button>
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