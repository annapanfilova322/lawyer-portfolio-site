import { Button } from "@/components/ui/button";

interface LoginFormProps {
  password: string;
  setPassword: (value: string) => void;
  loginError: string;
  onLogin: () => void;
  onForgotPassword: () => void;
  isBlocked?: boolean;
  blockTime?: number;
}

const LoginForm = ({ 
  password, 
  setPassword, 
  loginError, 
  onLogin, 
  onForgotPassword, 
  isBlocked = false, 
  blockTime = 0 
}: LoginFormProps) => {
  
  const formatTime = (ms: number) => {
    const minutes = Math.ceil(ms / 1000 / 60);
    return `${minutes} минут`;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isBlocked && onLogin()}
          placeholder={isBlocked ? "Система заблокирована" : "Введите пароль"}
          disabled={isBlocked}
          className={`w-full px-4 py-2 border rounded focus:outline-none ${
            isBlocked 
              ? "bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed" 
              : "border-slate-300 focus:border-mint"
          }`}
        />
        {loginError && (
          <p className={`text-sm mt-2 ${
            loginError.includes("заблокирована") ? "text-orange-600" : "text-red-600"
          }`}>
            {loginError}
          </p>
        )}
      </div>
      
      <Button 
        onClick={onLogin} 
        disabled={isBlocked}
        className={`w-full ${
          isBlocked ? "bg-slate-400 cursor-not-allowed" : ""
        }`}
      >
        {isBlocked ? "Система заблокирована" : "Войти"}
      </Button>
      
      <button
        onClick={onForgotPassword}
        disabled={isBlocked}
        className={`text-xs underline w-full text-center ${
          isBlocked 
            ? "text-slate-400 cursor-not-allowed" 
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Забыли пароль?
      </button>
      
      <div className="text-xs text-slate-500 text-center mt-4 space-y-1">
        {isBlocked ? (
          <p className="text-orange-600">
            ⚠️ Система заблокирована. Повторите через {formatTime(blockTime)}
          </p>
        ) : (
          <p>Защита: rate limiting (5 попыток), блокировка на 30 минут</p>
        )}
        <p>Текущая защита: {isBlocked ? "🔒 Заблокировано" : "✅ Активно"}</p>
      </div>
    </div>
  );
};

export default LoginForm;
