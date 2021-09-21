import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/devextreme/dist/css/dx.common.css';
import '../node_modules/devextreme/dist/css/dx.light.css';
import '../node_modules/devexpress-diagram/dist/dx-diagram.css';
import './index.css';
import CustomTemplateEdit from './diagram-demo/CustomTemplateEdit';
import CustomTemplateEdit2 from './diagram-demo/CustomTemplateEdit2';
import './App.css';

ReactDOM.render(
  <React.StrictMode>
    <CustomTemplateEdit />
  </React.StrictMode>,
  document.getElementById('root')
);

