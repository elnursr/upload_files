import { uploadFilesInput, uploadFilesResultButton } from './_global_variables.js';
import upload from './upload_file.js';

let upload_files = new upload.uploadFiles();


uploadFilesInput.addEventListener('change', function (e) {
    upload_files.removePreviewElements('.upload-files__element');
    upload_files.getFile(e.target.files[0]);
    upload_files.getFiles(e.target.files);
    upload_files.getLength(e.target.files.length);
    upload_files.uploadFile();
    uploadFilesResultButton.classList.add('active');
});

uploadFilesResultButton.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.remove('active');
    upload_files.removePreviewElements('.upload-files__element');
    uploadFilesInput.value = '';
});