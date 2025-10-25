import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Testimonial {
  company: string;
  letterUrl: string;
}

interface AdminPanelProps {
  testimonials: Testimonial[];
  onUpdate: (testimonials: Testimonial[]) => void;
}

const AdminPanel = ({ testimonials, onUpdate }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({ company: "", letterUrl: "" });

  const ADMIN_PASSWORD = "admin123";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Неверный пароль");
    }
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.company.trim()) {
      onUpdate([...testimonials, newTestimonial]);
      setNewTestimonial({ company: "", letterUrl: "" });
    }
  };

  const handleEditTestimonial = (index: number) => {
    if (editingIndex === index) {
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
    }
  };

  const handleUpdateTestimonial = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleDeleteTestimonial = (index: number) => {
    if (confirm("Удалить этот отзыв?")) {
      const updated = testimonials.filter((_, i) => i !== index);
      onUpdate(updated);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        aria-label="Открыть панель администратора"
      >
        <Icon name="Settings" size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Панель администратора</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
            }}
            className="text-slate-500 hover:text-slate-700"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Введите пароль"
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
            />
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border border-slate-200 p-4 rounded">
              <h3 className="font-bold text-lg mb-4">Добавить отзыв</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newTestimonial.company}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                  placeholder="Название компании"
                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  value={newTestimonial.letterUrl}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, letterUrl: e.target.value })}
                  placeholder="Ссылка на письмо (необязательно)"
                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
                />
                <Button onClick={handleAddTestimonial} className="w-full">
                  Добавить
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Текущие отзывы</h3>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border border-slate-200 p-4 rounded space-y-3">
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={testimonial.company}
                        onChange={(e) => handleUpdateTestimonial(index, "company", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={testimonial.letterUrl}
                        onChange={(e) => handleUpdateTestimonial(index, "letterUrl", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
                      />
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">{testimonial.company}</p>
                      {testimonial.letterUrl && (
                        <p className="text-sm text-slate-600 break-all">{testimonial.letterUrl}</p>
                      )}
                    </>
                  )}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditTestimonial(index)}
                      variant="outline"
                      size="sm"
                    >
                      {editingIndex === index ? "Сохранить" : "Редактировать"}
                    </Button>
                    <Button
                      onClick={() => handleDeleteTestimonial(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
