import { Button } from "@/components/ui/button";

interface Testimonial {
  company: string;
  letterUrl: string;
}

interface TestimonialAddFormProps {
  newTestimonial: Testimonial;
  setNewTestimonial: (testimonial: Testimonial) => void;
  onPublish: () => void;
  onCancel: () => void;
}

const TestimonialAddForm = ({ newTestimonial, setNewTestimonial, onPublish, onCancel }: TestimonialAddFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-4">Добавить новый отзыв</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Компания *
            </label>
            <input
              type="text"
              value={newTestimonial.company}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
              placeholder='Например: ООО "Северная Корона"'
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ссылка на благодарственное письмо (необязательно)
            </label>
            <input
              type="url"
              value={newTestimonial.letterUrl}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, letterUrl: e.target.value })}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={onPublish} className="flex-1">
              Опубликовать
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1">
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialAddForm;
