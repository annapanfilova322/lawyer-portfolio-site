import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Testimonial {
  id?: number;
  company: string;
  letterUrl: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  
  const sortedTestimonials = [...testimonials].sort((a, b) => {
    const idA = a.id || 0;
    const idB = b.id || 0;
    return idB - idA;
  });

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
                    <button 
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="px-4 py-2 bg-mint text-slate-900 text-xs font-semibold rounded-md hover:bg-mint/90 transition-colors shadow-sm"
                    >
                      Открыть отзыв
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTestimonial && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 pr-12">
                {selectedTestimonial.company}
              </h3>
              
              {selectedTestimonial.letterUrl ? (
                <div className="space-y-4">
                  <img 
                    src={selectedTestimonial.letterUrl} 
                    alt={`Благодарственное письмо от ${selectedTestimonial.company}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <a
                    href={selectedTestimonial.letterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-mint text-slate-900 text-sm font-semibold rounded-md hover:bg-mint/90 transition-colors"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Открыть в новой вкладке
                  </a>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Icon name="FileText" size={32} className="text-slate-400" />
                  </div>
                  <p className="text-slate-600">
                    Благодарственное письмо не прикреплено
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;