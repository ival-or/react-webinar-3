import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {generateItemCode} from "./utils";

const store = new Store({
  list: [
    { code: generateItemCode(), title: 'Название элемента', selectionCount: 0 },
    { code: generateItemCode(), title: 'Некий объект', selectionCount: 0 },
    { code: generateItemCode(), title: 'Заголовок', selectionCount: 0 },
    { code: generateItemCode(), title: 'Очень длинное название элемента из семи слов', selectionCount: 0 },
    { code: generateItemCode(), title: 'Запись', selectionCount: 0 },
    { code: generateItemCode(), title: 'Шестая запись', selectionCount: 0 },
    { code: generateItemCode(), title: 'Седьмая запись', selectionCount: 0 },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
