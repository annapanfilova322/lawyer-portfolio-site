import { Button } from "@/components/ui/button";

interface PasswordResetFormProps {
  masterKey: string;
  setMasterKey: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  passwordResetError: string;
  onPasswordReset: () => void;
  onCancel: () => void;
}

const PasswordResetForm = ({
  masterKey,
  setMasterKey,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  passwordResetError,
  onPasswordReset,
  onCancel
}: PasswordResetFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Смена пароля</h3>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Мастер-ключ</label>
        <input
          type="text"
          value={masterKey}
          onChange={(e) => setMasterKey(e.target.value)}
          placeholder="Введите мастер-ключ"
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Новый пароль</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Введите новый пароль"
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Повторите новый пароль</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите новый пароль"
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
        />
      </div>
      {passwordResetError && (
        <p className="text-red-600 text-sm">{passwordResetError}</p>
      )}
      <div className="flex gap-3">
        <Button onClick={onPasswordReset} className="flex-1">
          Изменить пароль
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default PasswordResetForm;
