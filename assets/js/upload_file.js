import { uploadFilesPreview, uploadFilesResult } from './_global_variables.js';

function uploadFiles() {
}

uploadFiles.prototype.getFile = function (file) {
    this.file = file;
}

uploadFiles.prototype.getFiles = function (files) {
    this.files = files;
}

uploadFiles.prototype.getLength = function (length) {
    this.length = length;
}

uploadFiles.prototype.fileReader = function () {
    this.file_reader = new FileReader();
}

uploadFiles.prototype.createAudio = function () {
    this.newAudio = new Audio();
}

uploadFiles.prototype.createVideo = function () {
    this.newVideo = document.createElement('video');
}

uploadFiles.prototype.removePreviewElements = function (file_class_name) {
    let uploadElements = document.querySelectorAll(file_class_name);
    uploadElements.forEach(uploadElement => {
        uploadElement.remove();
    });
}

uploadFiles.prototype.uploadFile = function () {
    switch (this.file.type) {
        case 'image/png':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/svg+xml':
        case 'image/vnd.microsoft.icon':
            for (let i = 0; i < this.length; i++) {
                this.fileReader();
                this.file_reader.readAsDataURL(this.files[i]);
                this.file_reader.addEventListener('loadend', function (e) {
                    let image_url = e.target.result;
                    uploadFilesPreview.innerHTML =
                        `
                        <li class="upload-files-preview__item">
                            <img src="${image_url}" class="upload-files__element"/>
                        </li>
                        `;
                }.bind(this));
            }
            break;
        case 'video/mp4':
            this.fileReader();
            this.createVideo();
            this.file_reader.readAsDataURL(this.file);
            this.file_reader.addEventListener('loadend', function () {
                let video_url = this.file_reader.result;
                this.newVideo.classList.add('upload-files__element');
                this.newVideo.src = video_url;
                uploadFilesResult.append(this.newVideo);
            }.bind(this));
            break;
        case 'audio/wav':
            this.fileReader();
            this.createAudio();
            this.file_reader.readAsDataURL(this.file);
            this.file_reader.addEventListener('loadend', function () {
                let audio_url = this.file_reader.result;
                this.newAudio.classList.add('upload-files__element');
                this.newAudio.src = audio_url;
                this.newAudio.play();
                uploadFilesResult.append(this.newAudio);
            }.bind(this));
            break;
        default:
            break;
    }
}

export default { uploadFiles };