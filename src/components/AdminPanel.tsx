import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import LoginForm from "@/components/admin/LoginForm";
import PasswordResetForm from "@/components/admin/PasswordResetForm";
import AdminMenu from "@/components/admin/AdminMenu";
import ContactsEditForm from "@/components/admin/ContactsEditForm";
import CertificatesEditForm from "@/components/admin/CertificatesEditForm";
import TestimonialAddForm from "@/components/admin/TestimonialAddForm";
import TestimonialList from "@/components/admin/TestimonialList";

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

interface Certificate {
  name: string;
  url: string;
}

type Certificates = Certificate[];

interface AdminPanelProps {
  testimonials: Testimonial[];
  onUpdate: (testimonials: Testimonial[]) => void;
  apiUrl: string;
  onRefresh: () => void;
  contacts: Contacts;
  onUpdateContacts: (contacts: Contacts) => void;
  contactsApiUrl: string;
  onRefreshContacts: () => void;
  certificates: Certificate[];
  onUpdateCertificates: (certificates: Certificate[]) => void;
  certificatesApiUrl: string;
  onRefreshCertificates: () => void;
}

const AUTH_API_URL = 'https://functions.poehali.dev/77abf354-4102-47a5-ad5e-d5290b704fcd';

const AdminPanel = ({ testimonials, onUpdate, apiUrl, onRefresh, contacts, onUpdateContacts, contactsApiUrl, onRefreshContacts, certificates, onUpdateCertificates, certificatesApiUrl, onRefreshCertificates }: AdminPanelProps) => {
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

  const handlePasswordReset = async () => {
    setPasswordResetError("");

    if (newPassword.length < 6) {
      setPasswordResetError("Пароль должен быть не менее 6 символов");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordResetError("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          master_key: masterKey,
          new_password: newPassword 
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Пароль успешно изменен");
        setShowPasswordReset(false);
        setMasterKey("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordResetError("");
      } else if (response.status === 429) {
        setPasswordResetError(`Слишком много попыток. Повторите через ${Math.ceil(data.retry_after / 60)} минут.`);
      } else {
        setPasswordResetError(data.error || "Ошибка смены пароля");
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setPasswordResetError("Ошибка подключения к серверу");
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
    setShowContactsEdit(false);
    setShowCertificatesEdit(false);
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

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    const updated = [...testimonials];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onUpdate(updated);
    
    try {
      await fetch(apiUrl, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
        body: JSON.stringify(updated)
      });
    } catch (error) {
      console.error("Error reordering testimonials:", error);
      onRefresh();
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === testimonials.length - 1) return;
    
    const updated = [...testimonials];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onUpdate(updated);
    
    try {
      await fetch(apiUrl, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
        body: JSON.stringify(updated)
      });
    } catch (error) {
      console.error("Error reordering testimonials:", error);
      onRefresh();
    }
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

  const handleSaveCertificates = async () => {
    try {
      const response = await fetch(certificatesApiUrl, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
        body: JSON.stringify(editedCertificates)
      });

      if (response.ok) {
        onUpdateCertificates(editedCertificates);
        onRefreshCertificates();
        setShowCertificatesEdit(false);
        alert("Сертификаты обновлены");
      } else {
        alert("Ошибка при обновлении сертификатов");
      }
    } catch (error) {
      console.error("Error updating certificates:", error);
      alert("Ошибка при обновлении сертификатов");
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
          showPasswordReset ? (
            <PasswordResetForm
              masterKey={masterKey}
              setMasterKey={setMasterKey}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordResetError={passwordResetError}
              onPasswordReset={handlePasswordReset}
              onCancel={() => {
                setShowPasswordReset(false);
                setMasterKey("");
                setNewPassword("");
                setConfirmPassword("");
                setPasswordResetError("");
              }}
            />
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