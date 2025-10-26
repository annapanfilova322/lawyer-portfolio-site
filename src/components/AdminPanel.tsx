import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import LoginForm from "@/components/admin/LoginForm";
import PasswordResetForm from "@/components/admin/PasswordResetForm";
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
  const [showPasswordReset, setShowPasswordReset] = useState(false);
const [masterKey, setMasterKey] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordResetError, setPasswordResetError] = useState("");
  

  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsOpen(true);
    };

    window.addEventListener('openAdminPanel', handleOpenAdmin);
    return () => window.removeEventListener('openAdminPanel', handleOpenAdmin);
  }, []);

  // ПРОСТАЯ ПРОВЕРКА ПАРОЛЯ
  const handleLogin = () => {
    setLoginError("");
    
    if (password === siteData.adminPassword) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      setLoginError("Неверный пароль");
    }
  };
  const handlePasswordReset = () => {
  setPasswordResetError("");

  if (newPassword.length < 6) {
    setPasswordResetError("Пароль должен быть не менее 6 символов");
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordResetError("Пароли не совпадают");
    return;
  }

  // ВАШ МАСТЕР-КЛЮЧ
  if (masterKey === "K7#m@nPq$vR2!xL") {
    // Обновляем пароль в данных
    siteData.adminPassword = newPassword;
    alert("Пароль успешно изменен");
    setShowPasswordReset(false);
    setMasterKey("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordResetError("");
  } else {
    setPasswordResetError("Неверный мастер-ключ");
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
  showPasswordReset ? (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Смена пароля</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Мастер-ключ
          </label>
          <input
            type="password"
            value={masterKey}
            onChange={(e) => setMasterKey(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите мастер-ключ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Новый пароль
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Не менее 6 символов"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Подтвердите пароль
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Повторите новый пароль"
          />
        </div>
      </div>

      {passwordResetError && (
        <p className="text-red-600 text-sm">{passwordResetError}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handlePasswordReset}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Сменить пароль
        </button>
        <button
          onClick={() => {
            setShowPasswordReset(false);
            setMasterKey("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordResetError("");
          }}
          className="flex-1 bg-slate-300 text-slate-700 py-2 px-4 rounded-md hover:bg-slate-400 transition-colors"
        >
          Отмена
        </button>
      </div>
    </div>
  ) : (
    <LoginForm
      password={password}
      setPassword={setPassword}
      loginError={loginError}
      onLogin={handleLogin}
      onForgotPassword={() => setShowPasswordReset(true)}
    />
  )
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
