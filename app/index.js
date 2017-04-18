import React from 'react';
import ReactDOM from 'react-dom';
import Maincontainner from './MainContainer';

require('../styles/main.scss');

ReactDOM.render(<div className="gateway"><Maincontainner /></div>, document.getElementById('content'));