import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Простой тестовый компонент
function TestApp() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>✅ Тестовая страница работает!</h1>
      <p>Если ты видишь это сообщение - сайт работает</p>
      <p>Проблема в компонентах, а не в настройках</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
