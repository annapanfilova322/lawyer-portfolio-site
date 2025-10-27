import { Button } from "@/components/ui/button";

interface Certificate {
  name: string;
  url: string;
}

interface CertificatesEditFormProps {
  editedCertificates: Certificate[];
  setEditedCertificates: (certificates: Certificate[]) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CertificatesEditForm = ({
  editedCertificates,
  setEditedCertificates,
  onSave,
  onCancel
}: CertificatesEditFormProps) => {
  const updateCertificate = (index: number, field: 'name' | 'url', value: string) => {
    const updated = [...editedCertificates];
    updated[index] = { ...updated[index], [field]: value };
    setEditedCertificates(updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900">Редактировать сертификаты</h3>
      <p className="text-sm text-slate-600">Максимум 3 сертификата. Оставьте поля пустыми, чтобы скрыть сертификат.</p>
      
      <div className="space-y-6">
        {editedCertificates.map((cert, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">Сертификат {index + 1}</h4>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Название сертификата
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                placeholder="Например: Сертификат Сколково"
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Ссылка на сертификат
              </label>
              <input
                type="url"
                value={cert.url}
                onChange={(e) => updateCertificate(index, 'url', e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        ))}
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