import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import LoginForm from "@/components/admin/LoginForm";
import AdminMenu from "@/components/admin/AdminMenu";
import ContactsEditForm from "@/components/admin/ContactsEditForm";
import CertificatesEditForm from "@/components/admin/CertificatesEditForm";
import TestimonialAddForm from "@/components/admin/TestimonialAddForm";
import TestimonialList from "@/components/admin/TestimonialList";
import { siteData } from "@/data";

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

interface Certificates {
  skolkovo: string;
  compliance: string;
}

interface AdminPanelProps {
  testimonials: Testimonial[];
  onUpdate: (testimonials: Testimonial[]) => void;
  contacts: Contacts;
  onUpdateContacts: (contacts: Contacts) => void;
  certificates: Certificates;
  onUpdateCertificates: (certificates: Certificates) => void;
}

const AdminPanel = ({ testimonials, onUpdate, contacts, onUpdateContacts, certificates, onUpdateCertificates }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({ company: "", letterUrl: "" });
  const [loginError, setLoginError] = useState("");
  const [showContactsEdit, setShowContactsEdit] = useState(false);
  const [editedContacts, setEditedContacts] = useState(contacts);
  const [showCertificatesEdit, setShowCertificatesEdit] = useState(false);
  const [editedCertificates, setEditedCertificates] = useState(certificates);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTime, setBlockTime] = useState(0);

  // 🔒 ЗАГРУЗКА СОХРАНЁННЫХ ДАННЫХ ПРИ ЗАПУСКЕ
  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsOpen(true);
    };

    // Проверяем блокировку
    const blockedUntil = localStorage.getItem('adminBlockedUntil');
    if (blockedUntil && Date.now() < parseInt(blockedUntil)) {
      setIsBlocked(true);
      setBlockTime(parseInt(blockedUntil) - Date.now());
    }

    // Загружаем сохранённые попытки входа
    const savedAttempts = localStorage.getItem('loginAttempts');
    if (savedAttempts) {
      setLoginAttempts(parseInt(savedAttempts));
    }

    window.addEventListener('openAdminPanel', handleOpenAdmin);
    return () => window.removeEventListener('openAdminPanel', handleOpenAdmin);
  }, []);

  // 🔒 ТАЙМЕР РАЗБЛОКИРОВКИ
  useEffect(() => {
    if (!isBlocked) return;

    const timer = setInterval(() => {
      const timeLeft = blockTime - 1000;
      setBlockTime(timeLeft);

      if (timeLeft <= 0) {
        setIsBlocked(false);
        localStorage.removeItem('adminBlockedUntil');
        localStorage.removeItem('loginAttempts');
        setLoginAttempts(0);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isBlocked, blockTime]);

  // 🔒 ПРОВЕРКА ПАРОЛЯ С ЗАЩИТОЙ
  const handleLogin = () => {
    if (isBlocked) {
      setLoginError(`Система заблокирована. Повторите через ${Math.ceil(blockTime / 1000 / 60)} минут`);
      return;
    }

    setLoginError("");

    // 🔒 ПРОВЕРКА СТАТИЧНОГО ПАРОЛЯ
    if (password === siteData.adminPassword) {
      setIsAuthenticated(true);
      setPassword("");
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
    } else {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      localStorage.setItem('loginAttempts', attempts.toString());

      if (attempts >= 5) {
        // Блокировка на 30 минут
        const blockUntil = Date.now() + 30 * 60 * 1000;
        setIsBlocked(true);
        setBlockTime(30 * 60 * 1000);
        localStorage.setItem('adminBlockedUntil', blockUntil.toString());
        setLoginError("Слишком много попыток. Система заблокирована на 30 минут.");
      } else {
        setLoginError(`Неверный пароль. Осталось попыток: ${5 - attempts}`);
      }
    }
  };

  // ДОБАВЛЕНИЕ ОТЗЫВА В ПАМЯТИ
  const handlePublishTestimonial = () => {
    if (!newTestimonial.company.trim()) {
      alert("Пожалуйста, заполните название компании");
      return;
    }

    const newTestimonialWithId: Testimonial = {
      id: testimonials.length + 1,
      company: newTestimonial.company,
      letterUrl: newTestimonial.letterUrl
    };

    const updatedTestimonials = [...testimonials, newTestimonialWithId];
    onUpdate(updatedTestimonials);
    
    setNewTestimonial({ company: "", letterUrl: "" });
    setShowAddForm(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAddForm(false);
    setShowContactsEdit(false);
    setShowCertificatesEdit(false);
    setIsOpen(false);
  };

  // УДАЛЕНИЕ ОТЗЫВА ИЗ ПАМЯТИ
  const handleDeleteTestimonial = (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    onUpdate(updatedTestimonials);
  };

  // ОБНОВЛЕНИЕ ОТЗЫВА В ПАМЯТИ
  const handleUpdateTestimonial = (testimonial: Testimonial) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === testimonial.id ? testimonial : t
    );
    onUpdate(updatedTestimonials);
    setEditingIndex(null);
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  // ПЕРЕМЕЩЕНИЕ ОТЗЫВОВ
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const updated = [...testimonials];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onUpdate(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === testimonials.length - 1) return;
    
    const updated = [...testimonials];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onUpdate(updated);
  };

  // СОХРАНЕНИЕ КОНТАКТОВ В ПАМЯТИ
  const handleSaveContacts = () => {
    onUpdateContacts(editedContacts);
    setShowContactsEdit(false);
    alert("Контактные данные обновлены");
  };

  // СОХРАНЕНИЕ СЕРТИФИКАТОВ В ПАМЯТИ
  const handleSaveCertificates = () => {
    onUpdateCertificates(editedCertificates);
    setShowCertificatesEdit(false);
    alert("Сертификаты обновлены");
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
          <LoginForm
            password={password}
            setPassword={setPassword}
            loginError={loginError}
            onLogin={handleLogin}
            isBlocked={isBlocked}
            blockTime={blockTime}
          />
        ) : !showAddForm && !showContactsEdit && !showCertificatesEdit ? (
          <>
            <AdminMenu
              contacts={contacts}
              onAddTestimonial={() => setShowAddForm(true)}
              onEditContacts={() => {
                setEditedContacts(contacts);
                setShowContactsEdit(true);
              }}
              onEditCertificates={() => {
                setEditedCertificates(certificates);
                setShowCertificatesEdit(true);
              }}
              onLogout={handleLogout}
            />
            <div className="mt-6 pt-6 border-t border-slate-200">
              <TestimonialList
                testimonials={testimonials}
                editingIndex={editingIndex}
                onEdit={(index) => setEditingIndex(index)}
                onSave={handleUpdateTestimonial}
                onCancel={() => setEditingIndex(null)}
                onDelete={handleDeleteTestimonial}
                onFieldChange={handleFieldChange}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            </div>
          </>
        ) : showContactsEdit ? (
          <ContactsEditForm
            editedContacts={editedContacts}
            setEditedContacts={setEditedContacts}
            onSave={handleSaveContacts}
            onCancel={() => setShowContactsEdit(false)}
          />
        ) : showCertificatesEdit ? (
          <CertificatesEditForm
            editedCertificates={editedCertificates}
            setEditedCertificates={setEditedCertificates}
            onSave={handleSaveCertificates}
            onCancel={() => setShowCertificatesEdit(false)}
          />
        ) : (
          <TestimonialAddForm
            newTestimonial={newTestimonial}
            setNewTestimonial={setNewTestimonial}
            onPublish={handlePublishTestimonial}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
