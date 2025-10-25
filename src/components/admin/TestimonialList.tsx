import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Testimonial {
  id?: number;
  company: string;
  letterUrl: string;
}

interface TestimonialListProps {
  testimonials: Testimonial[];
  editingIndex: number | null;
  onEdit: (index: number) => void;
  onSave: (testimonial: Testimonial) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onFieldChange: (index: number, field: string, value: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const TestimonialList = ({
  testimonials,
  editingIndex,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFieldChange,
  onMoveUp,
  onMoveDown
}: TestimonialListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg">Текущие отзывы ({testimonials.length})</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id || index} className="border border-slate-200 p-4 rounded-lg">
            {editingIndex === index ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Компания</label>
                  <input
                    type="text"
                    value={testimonial.company}
                    onChange={(e) => onFieldChange(index, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ссылка на письмо</label>
                  <input
                    type="url"
                    value={testimonial.letterUrl || ''}
                    onChange={(e) => onFieldChange(index, 'letterUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onSave(testimonial)} size="sm" className="flex-1">
                    Сохранить
                  </Button>
                  <Button onClick={onCancel} variant="outline" size="sm" className="flex-1">
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 break-words">{testimonial.company}</p>
                  {testimonial.letterUrl && (
                    <a
                      href={testimonial.letterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline break-all"
                    >
                      Письмо
                    </a>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    className="text-slate-600 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Вверх"
                  >
                    <Icon name="ChevronUp" size={16} />
                  </button>
                  <button
                    onClick={() => onMoveDown(index)}
                    disabled={index === testimonials.length - 1}
                    className="text-slate-600 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Вниз"
                  >
                    <Icon name="ChevronDown" size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(index)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Редактировать"
                  >
                    <Icon name="Pencil" size={16} />
                  </button>
                  <button
                    onClick={() => testimonial.id && onDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Удалить"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialList;