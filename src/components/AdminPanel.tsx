import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Testimonial {
  id?: number;
  company: string;
  letterUrl: string;
}

interface AdminPanelProps {
  testimonials: Testimonial[];
  onUpdate: (testimonials: Testimonial[]) => void;
  apiUrl: string;
  onRefresh: () => void;
}

const AdminPanel = ({ testimonials, onUpdate, apiUrl, onRefresh }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({ company: "", letterUrl: "" });

  const ADMIN_PASSWORD = "panfilova2025";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Неверный пароль");
    }
  };



  const handlePublishTestimonial = async () => {
    if (!newTestimonial.company.trim()) {
      alert("Пожалуйста, заполните название компании");
      return;
    }

    if (!newTestimonial.letterUrl.trim()) {
      alert("Пожалуйста, вставьте ссылку на благодарственное письмо");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: newTestimonial.company,
          letterUrl: newTestimonial.letterUrl
        })
      });

      if (response.ok) {
        setNewTestimonial({ company: "", letterUrl: "" });
        setShowAddForm(false);
        onRefresh();
      } else {
        alert("Ошибка при добавлении отзыва");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Ошибка при добавлении отзыва");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAddForm(false);
    setIsOpen(false);
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    try {
      const response = await fetch(`${apiUrl}?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onRefresh();
      } else {
        alert("Ошибка при удалении отзыва");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Ошибка при удалении отзыва");
    }
  };

  const handleUpdateTestimonial = async (testimonial: Testimonial) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial)
      });

      if (response.ok) {
        setEditingIndex(null);
        onRefresh();
      } else {
        alert("Ошибка при обновлении отзыва");
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
      alert("Ошибка при обновлении отзыва");
    }
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
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
            onClick={handleLogout}
            className="text-slate-500 hover:text-slate-700"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Введите пароль"
                className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </div>
        ) : !showAddForm ? (
          <div className="space-y-4">
            <Button onClick={() => setShowAddForm(true)} className="w-full">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить отзыв
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Выход
            </Button>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-bold text-lg mb-4">Все отзывы ({testimonials.length})</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id || index} className="border border-slate-200 p-4 rounded space-y-3">
                    {editingIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={testimonial.company}
                          onChange={(e) => handleFieldChange(index, "company", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
                          placeholder="Название компании"
                        />
                        <input
                          type="text"
                          value={testimonial.letterUrl}
                          onChange={(e) => handleFieldChange(index, "letterUrl", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
                          placeholder="Ссылка на файл"
                        />
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdateTestimonial(testimonial)} size="sm">
                            Сохранить
                          </Button>
                          <Button onClick={() => setEditingIndex(null)} variant="outline" size="sm">
                            Отмена
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="font-semibold text-slate-900">{testimonial.company}</p>
                          {testimonial.letterUrl && (
                            <p className="text-xs text-slate-500 mt-1 break-all">Файл прикреплен</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingIndex(index)}
                            variant="outline"
                            size="sm"
                          >
                            <Icon name="Edit" size={16} className="mr-1" />
                            Редактировать
                          </Button>
                          <Button
                            onClick={() => testimonial.id && handleDeleteTestimonial(testimonial.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Icon name="Trash2" size={16} className="mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
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
                    Ссылка на благодарственное письмо
                  </label>
                  <input
                    type="url"
                    value={newTestimonial.letterUrl}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, letterUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    <Icon name="Info" size={14} className="inline mr-1" />
                    Поддерживаются ссылки из Google Drive или Яндекс.Диск. Убедитесь, что доступ по ссылке открыт для всех.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handlePublishTestimonial} className="flex-1">
                <Icon name="Check" size={20} className="mr-2" />
                Опубликовать отзыв
              </Button>
              <Button onClick={() => {
                setShowAddForm(false);
                setNewTestimonial({ company: "", letterUrl: "" });
              }} variant="outline" className="flex-1">
                Выход
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;