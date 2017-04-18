import React, { Component } from 'react';
const ipc = require('electron').ipcRenderer;
var fs = require('fs');

class MainContainer extends Component {

    constructor(props) {
        super(props);

        this.getImagesFromFile = this.getImagesFromFile.bind(this);

        this.state = {
            uploadedFiles: null
        }
    }

  componentDidMount() {
    this._setDefaultState(this.props);
  }

    render() {
        console.log(`state=======: `, this.state.uploadedFiles)

        return (
            <div>
                <h1 className="em-page-title">Ember Demo</h1>
                <button onClick={() => this.onImportClick()} className="em-import-btn" id="select-directory">Import Assets</button>
                <h3>Selected Path: <span id="selected-file"></span></h3>
                {this.getImagesFromFile(this.state.uploadedFiles)}
            </div>
        );
    }

    getImagesFromFile(uploadedFiles) {
        if (uploadedFiles) console.log('===========getImagesNode uploadedFiles: ', uploadedFiles)
        // TODO: if not work just have it check if the uploadedFiles i empty and only if then read files to set them and for a refresh have it clear the uploaded files so render hits it again
        return (
            <div>
                <h4>images list</h4>
                <img src="/public/imports/shot.png" />
                {uploadedFiles}
                {uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles.map(file => <div>{file}<img src={`/public/imports/${file}`} /></div>) : null}
            </div>
        )

    }

    onImportClick() {
        //TODO: Clean this up a bit
        const selectDirBtn = document.getElementById('select-directory');

        selectDirBtn.addEventListener('click', function (event) {
            ipc.send('open-file-dialog');
        });

        ipc.on('selected-file', function (event, path) {
            document.getElementById('selected-file').innerHTML = `You selected: ${path}`;   
        });
    }

   _setDefaultState(props) {
    let filenames = []
        
    fs.readdir('./public/imports', (err, names) => {
        if (err) return console.log(err)
        filenames.push(names)
    })

    console.log('setDefaultState filenames: ', filenames)

    this.setState({uploadedFiles: filenames})
  }

}

export default(MainContainer);