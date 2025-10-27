import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import LoginForm from "@/components/admin/LoginForm";
import AdminMenu from "@/components/admin/AdminMenu";
import ContactsEditForm from "@/components/admin/ContactsEditForm";
import CertificatesEditForm from "@/components/admin/CertificatesEditForm";
import TestimonialAddForm from "@/components/admin/TestimonialAddForm";
import TestimonialList from "@/components/admin/TestimonialList";
import { siteData } from "@/data";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id?: string;
  company_name: string;
  letter_link: string;
  sort_order?: number;
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
  testimonials: any[];
  onUpdate: (testimonials: any[]) => void;
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
  const [newTestimonial, setNewTestimonial] = useState({ company_name: "", letter_link: "" });
  const [loginError, setLoginError] = useState("");
  const [showContactsEdit, setShowContactsEdit] = useState(false);
  const [editedContacts, setEditedContacts] = useState(contacts);
  const [showCertificatesEdit, setShowCertificatesEdit] = useState(false);
  const [editedCertificates, setEditedCertificates] = useState(certificates);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTime, setBlockTime] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsOpen(true);
    };

    const blockedUntil = localStorage.getItem('adminBlockedUntil');
    if (blockedUntil && Date.now() < parseInt(blockedUntil)) {
      setIsBlocked(true);
      setBlockTime(parseInt(blockedUntil) - Date.now());
    }

    const savedAttempts = localStorage.getItem('loginAttempts');
    if (savedAttempts) {
      setLoginAttempts(parseInt(savedAttempts));
    }

    window.addEventListener('openAdminPanel', handleOpenAdmin);
    return () => window.removeEventListener('openAdminPanel', handleOpenAdmin);
  }, []);

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

  const handleLogin = () => {
    if (isBlocked) {
      setLoginError(`Система заблокирована. Повторите через ${Math.ceil(blockTime / 1000 / 60)} минут`);
      return;
    }

    setLoginError("");

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

  const handlePublishTestimonial = async () => {
    if (!newTestimonial.company_name.trim()) {
      alert("Пожалуйста, заполните название компании");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([
          {
            company_name: newTestimonial.company_name,
            letter_link: newTestimonial.letter_link,
            sort_order: testimonials.length
          }
        ])
        .select();

      if (error) {
        console.error('Ошибка добавления отзыва:', error);
        alert('Ошибка при добавлении отзыва');
      } else {
        setNewTestimonial({ company_name: "", letter_link: "" });
        setShowAddForm(false);
        alert('Отзыв успешно добавлен!');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при добавлении отзыва');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAddForm(false);
    setShowContactsEdit(false);
    setShowCertificatesEdit(false);
    setIsOpen(false);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Ошибка удаления отзыва:', error);
        alert('Ошибка при удалении отзыва');
      } else {
        alert('Отзыв успешно удален!');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при удалении отзыва');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTestimonial = async (testimonial: Testimonial) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          company_name: testimonial.company_name,
          letter_link: testimonial.letter_link
        })
        .eq('id', testimonial.id);

      if (error) {
        console.error('Ошибка обновления отзыва:', error);
        alert('Ошибка при обновлении отзыва');
      } else {
        setEditingIndex(null);
        alert('Отзыв успешно обновлен!');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при обновлении отзыва');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    const testimonial = testimonials[index];
    const prevTestimonial = testimonials[index - 1];
    
    setLoading(true);
    try {
      const { error: error1 } = await supabase
        .from('testimonials')
        .update({ sort_order: index - 1 })
        .eq('id', testimonial.id);

      const { error: error2 } = await supabase
        .from('testimonials')
        .update({ sort_order: index })
        .eq('id', prevTestimonial.id);

      if (error1 || error2) {
        console.error('Ошибка перемещения:', error1 || error2);
        alert('Ошибка при перемещении отзыва');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при перемещении отзыва');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === testimonials.length - 1) return;
    
    const testimonial = testimonials[index];
    const nextTestimonial = testimonials[index + 1];
    
    setLoading(true);
    try {
      const { error: error1 } = await supabase
        .from('testimonials')
        .update({ sort_order: index + 1 })
        .eq('id', testimonial.id);

      const { error: error2 } = await supabase
        .from('testimonials')
        .update({ sort_order: index })
        .eq('id', nextTestimonial.id);

      if (error1 || error2) {
        console.error('Ошибка перемещения:', error1 || error2);
        alert('Ошибка при перемещении отзыва');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при перемещении отзыва');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContacts = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('contacts')
        .update({
          phone: editedContacts.phone,
          email: editedContacts.email,
          address: editedContacts.address
        })
        .eq('id', '69534138-4074-dd6e-b844-47286-d04e7bb');

      if (error) {
        console.error('Ошибка обновления контактов:', error);
        alert('Ошибка при обновлении контактов');
      } else {
        setShowContactsEdit(false);
        alert("Контактные данные обновлены");
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при обновлении контактов');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCertificates = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('certificates')
        .update({
          skolkovo_link: editedCertificates.skolkovo,
          compliance_link: editedCertificates.compliance
        })
        .eq('id', 'b1b5fc10-4c0a-4726-94d1-8930e9f38a25');

      if (error) {
        console.error('Ошибка обновления сертификатов:', error);
        alert('Ошибка при обновлении сертификатов');
      } else {
        setShowCertificatesEdit(false);
        alert("Сертификаты обновлены");
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при обновлении сертификатов');
    } finally {
      setLoading(false);
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
                loading={loading}
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
