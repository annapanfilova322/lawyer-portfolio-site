import { Button } from "@/components/ui/button";

interface LoginFormProps {
  password: string;
  setPassword: (value: string) => void;
  loginError: string;
  onLogin: () => void;
  onForgotPassword: () => void;
}

const LoginForm = ({ password, setPassword, loginError, onLogin, onForgotPassword }: LoginFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onLogin()}
          placeholder="Введите пароль"
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-mint"
        />
        {loginError && (
          <p className="text-red-600 text-sm mt-2">{loginError}</p>
        )}
      </div>
      <Button onClick={onLogin} className="w-full">
        Войти
      </Button>
      <button
        onClick={onForgotPassword}
        className="text-xs text-slate-500 hover:text-slate-700 underline w-full text-center"
      >
        Забыли пароль?
      </button>
      <div className="text-xs text-slate-500 text-center mt-4">
        Защита: JWT токены, rate limiting (5 попыток)
      </div>
    </div>
  );
};

export default LoginForm;
