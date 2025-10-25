import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Contacts {
  phone: string;
  email: string;
  address: string;
}

interface AdminMenuProps {
  contacts: Contacts;
  onAddTestimonial: () => void;
  onEditContacts: () => void;
  onEditCertificates: () => void;
  onLogout: () => void;
}

const AdminMenu = ({ contacts, onAddTestimonial, onEditContacts, onEditCertificates, onLogout }: AdminMenuProps) => {
  return (
    <div className="space-y-4">
      <Button onClick={onAddTestimonial} className="w-full">
        <Icon name="Plus" size={20} className="mr-2" />
        Добавить отзыв
      </Button>
      <Button onClick={onEditContacts} variant="outline" className="w-full">
        <Icon name="Settings" size={20} className="mr-2" />
        Изменить контакты
      </Button>
      <Button onClick={onEditCertificates} variant="outline" className="w-full">
        <Icon name="Award" size={20} className="mr-2" />
        Изменить сертификаты
      </Button>
      <Button onClick={onLogout} variant="outline" className="w-full">
        Выход
      </Button>
    </div>
  );
};

export default AdminMenu;