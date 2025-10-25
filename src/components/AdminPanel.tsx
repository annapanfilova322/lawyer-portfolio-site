import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Testimonial {
  id?: number;
  company: string;
  letterUrl: string;
}

interface Contacts {
  phone: string;
  email: string;
  address: string;
}

interface AdminPanelProps {
  testimonials: Testimonial[];
  onUpdate: (testimonials: Testimonial[]) => void;
  apiUrl: string;
  onRefresh: () => void;
  contacts: Contacts;
  onUpdateContacts: (contacts: Contacts) => void;
  contactsApiUrl: string;
  onRefreshContacts: () => void;
}

const AUTH_API_URL = 'https://functions.poehali.dev/77abf354-4102-47a5-ad5e-d5290b704fcd';

const AdminPanel = ({ testimonials, onUpdate, apiUrl, onRefresh, contacts, onUpdateContacts, contactsApiUrl, onRefreshContacts }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({ company: "", letterUrl: "" });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");
  const [showContactsEdit, setShowContactsEdit] = useState(false);
  const [editedContacts, setEditedContacts] = useState(contacts);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) {
      verifyToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsOpen(true);
    };

    window.addEventListener('openAdminPanel', handleOpenAdmin);
    return () => window.removeEventListener('openAdminPanel', handleOpenAdmin);
  }, []);



  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'GET',
        headers: {
          'X-Auth-Token': token
        }
      });

      if (response.ok) {
        setAuthToken(token);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
        setAuthToken(null);
      }
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem('admin_token');
      setAuthToken(null);
    }
  };

  const handleLogin = async () => {
    setLoginError("");

    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setAuthToken(data.token);
        setIsAuthenticated(true);
        setPassword("");
        localStorage.setItem('admin_token', data.token);
      } else if (response.status === 429) {
        setLoginError(`Слишком много попыток. Повторите через ${Math.ceil(data.retry_after / 60)} минут.`);
      } else {
        setLoginError(data.error || "Неверный пароль");
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError("Ошибка подключения к серверу");
    }
  };

  const handlePublishTestimonial = async () => {
    if (!newTestimonial.company.trim()) {
      alert("Пожалуйста, заполните название компании");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
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
    setAuthToken(null);
    setShowAddForm(false);
    setIsOpen(false);
    localStorage.removeItem('admin_token');
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    try {
      const response = await fetch(`${apiUrl}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': authToken || '',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        onRefresh();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Delete error:", errorData);
        alert(`Ошибка при удалении отзыва: ${errorData.error || response.statusText}`);
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
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
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

  const handleSaveContacts = async () => {
    try {
      const response = await fetch(contactsApiUrl, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
        body: JSON.stringify(editedContacts)
      });

      if (response.ok) {
        onUpdateContacts(editedContacts);
        onRefreshContacts();
        setShowContactsEdit(false);
        alert("Контактные данные обновлены");
      } else {
        alert("Ошибка при обновлении контактов");
      }
    } catch (error) {
      console.error("Error updating contacts:", error);
      alert("Ошибка при обновлении контактов");
    }
  };

  if (!isOpen) {
    return null;
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
                className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
              />
              {loginError && (
                <p className="text-red-600 text-sm mt-2">{loginError}</p>
              )}
            </div>
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
            <div className="text-xs text-slate-500 text-center mt-4">
              Защита: JWT токены, rate limiting (5 попыток)
            </div>
          </div>
        ) : !showAddForm && !showContactsEdit ? (
          <div className="space-y-4">
            <Button onClick={() => setShowAddForm(true)} className="w-full">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить отзыв
            </Button>
            <Button onClick={() => {
              setEditedContacts(contacts);
              setShowContactsEdit(true);
            }} variant="outline" className="w-full">
              <Icon name="Settings" size={20} className="mr-2" />
              Изменить контакты
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
                          {testimonial.letterUrl ? (
                            <a 
                              href={testimonial.letterUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block mt-2"
                            >
                              <button className="px-4 py-2 bg-mint text-slate-900 text-xs font-semibold rounded-md hover:bg-mint/90 transition-colors shadow-sm">
                                Открыть отзыв
                              </button>
                            </a>
                          ) : (
                            <button className="px-4 py-2 bg-mint text-slate-900 text-xs font-semibold rounded-md hover:bg-mint/90 transition-colors shadow-sm mt-2">
                              Открыть отзыв
                            </button>
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
        ) : showContactsEdit ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Изменить контактные данные</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="text"
                    value={editedContacts.phone}
                    onChange={(e) => setEditedContacts({ ...editedContacts, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editedContacts.email}
                    onChange={(e) => setEditedContacts({ ...editedContacts, email: e.target.value })}
                    placeholder="lawyer@example.ru"
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Адрес *
                  </label>
                  <input
                    type="text"
                    value={editedContacts.address}
                    onChange={(e) => setEditedContacts({ ...editedContacts, address: e.target.value })}
                    placeholder="г. Санкт-Петербург"
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSaveContacts} className="flex-1">
                    Сохранить
                  </Button>
                  <Button onClick={() => setShowContactsEdit(false)} variant="outline" className="flex-1">
                    Отмена
                  </Button>
                </div>
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
                  <Button onClick={handlePublishTestimonial} className="flex-1">
                    Опубликовать
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                    Отмена
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;