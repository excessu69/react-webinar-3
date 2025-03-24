import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Функция для плюрализации слова "раз"
 * @param {number} count
 * @returns {string}
 */
function pluralizeCount(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} раз`;
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} раза`;
  } else {
    return `${count} раз`;
  }
}

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={event => store.selectItem(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}
                  {item.selectionCount > 0 && (
                    <span className="Item-counter"> | Выделяли {pluralizeCount(item.selectionCount)}</span>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={(event) => {
                    event.stopPropagation();
                    store.deleteItem(item.code);
                  }}>Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
