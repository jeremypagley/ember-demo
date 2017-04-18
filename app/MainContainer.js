import React from 'react';
const ipc = require('electron').ipcRenderer;

export default class  Maincontainner extends React.Component {

    render() {
        return (
            <div>
                <h1 className="em-page-title">Ember Demo</h1>
                <button onClick={() => this._onImportClick()} className="em-import-btn" id="select-directory">Import Assets</button>
            </div>
        );
    };

    _onImportClick() {
        //TODO: Clean this up a bit
        const selectDirBtn = document.getElementById('select-directory');

        selectDirBtn.addEventListener('click', function (event) {
            ipc.send('open-file-dialog');
        });

        ipc.on('selected-directory', function (event, path) {
            document.getElementById('selected-file').innerHTML = `You selected: ${path}`;
        });
    }
}