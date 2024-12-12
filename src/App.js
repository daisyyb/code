import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 
import Editor from './components/Editor.js'; 
import MarkdownParser from './components/MarkdownParser.js';
import EulerianPathFinder from './components/eulerian_path.js';

function App() {
  return (
    <div className="App">
      <h1>Anagram Finder</h1> {/* 제목을 설정합니다. */}
      <Editor /> {/* Editor 컴포넌트를 렌더링합니다. */}
      <hr/>
      <h1>MarkDown</h1>
      <h2>[# head, ## head, {'>'}인용글] 등으로 확인이 기능 확인이 가능합니다.</h2>
      <MarkdownParser/>
      <hr/>
      <EulerianPathFinder/>
    </div>
  );
}

export default App;

// React 애플리케이션의 진입점에서 App을 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);