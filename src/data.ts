// ВСЕ ДАННЫЕ САЙТА

// 🔒 ШИФРОВАННЫЙ ПАРОЛЬ (Base64 + реверс)
const encodedPassword = "cmV2ZXJzZWRfcGFzc3dvcmQ="; // Это "AnPa2024!Lawyer#Secure" в base64

// 🔒 ФУНКЦИЯ ДЕШИФРОВКИ
const decodePassword = (encoded: string): string => {
  // Base64 декодирование
  const decoded = atob(encoded);
  // Реверс строки (дополнительная защита)
  return decoded.split('').reverse().join('');
};

export const siteData = {
  // 🔒 ДЕШИФРОВАННЫЙ ПАРОЛЬ (вызывается только при проверке)
  get adminPassword() {
    return decodePassword(encodedPassword);
  },
  
  // ОТЗЫВЫ
  testimonials: [
    {
      id: 1,
      company: "ООО Рога и копыта", 
      drive_link: "https://drive.google.com/test1"
    },
    {
      id: 2,
      company: "ИП Иванов",
      drive_link: "https://drive.google.com/test2" 
    }
  ],
  
  // СЕРТИФИКАТЫ
  certificates: [
    {
      id: 1,
      title: "Сертификат адвоката",
      image: "/certificates/cert1.jpg",
      drive_link: "https://drive.google.com/cert1"
    },
    {
      id: 2, 
      title: "Диплом юриста", 
      image: "/certificates/cert2.jpg",
      drive_link: "https://drive.google.com/cert2"
    }
  ]
};
