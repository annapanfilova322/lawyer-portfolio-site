import { Button } from "@/components/ui/button";

interface Certificates {
  skolkovo: string;
  compliance: string;
}

interface CertificatesEditFormProps {
  editedCertificates: Certificates;
  setEditedCertificates: (certificates: Certificates) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CertificatesEditForm = ({
  editedCertificates,
  setEditedCertificates,
  onSave,
  onCancel
}: CertificatesEditFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900">Редактировать сертификаты</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ссылка на сертификат Сколково
          </label>
          <input
            type="url"
            value={editedCertificates.skolkovo}
            onChange={(e) => setEditedCertificates({
              ...editedCertificates,
              skolkovo: e.target.value
            })}
            placeholder="https://drive.google.com/..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ссылка на сертификат Комплаенс
          </label>
          <input
            type="url"
            value={editedCertificates.compliance}
            onChange={(e) => setEditedCertificates({
              ...editedCertificates,
              compliance: e.target.value
            })}
            placeholder="https://drive.google.com/..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} className="flex-1">
          Сохранить
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default CertificatesEditForm;
