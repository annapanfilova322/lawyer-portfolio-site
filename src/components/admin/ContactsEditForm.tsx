import { Button } from "@/components/ui/button";

interface Contacts {
  phone: string;
  email: string;
  address: string;
}

interface ContactsEditFormProps {
  editedContacts: Contacts;
  setEditedContacts: (contacts: Contacts) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ContactsEditForm = ({ editedContacts, setEditedContacts, onSave, onCancel }: ContactsEditFormProps) => {
  return (
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
            <Button onClick={onSave} className="flex-1">
              Сохранить
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

export default ContactsEditForm;
