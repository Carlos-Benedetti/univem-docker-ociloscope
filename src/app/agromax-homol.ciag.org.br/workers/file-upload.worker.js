"use strict";
/// <reference lib="webworker" />
const serviceMessageType = {
  Abort: "abort"
}
const FILEUPLOADER_MESSAGES_TYPE = {
  IdRecived: 0,
  RecivedFile: 1,
  UploadProgress: 2,
  Done: 3,
  Fail: 4,
  workerCreated: 5,
  Aborted: 6
};
/** @type {XMLHttpRequest} */


class Uploader {
  constructor() {
    /** @type {number|undefined} */
    this.id = undefined;

    /** @type {XMLHttpRequest|undefined} */
    this.xhr = undefined;
  }

  /**
   * 
   * @param {File} file
   * @param {string} link
   */
  async uploadFile(file, link) {
    postMessage({ status: FILEUPLOADER_MESSAGES_TYPE.RecivedFile });
    try {
      if (await caches.has('DEBUG_MODE') && await caches.has('FORCE_UPLOAD_FAIL')) {
        throw "(debug)force upload fail"
      }
      await this.futch(link, { method: 'PUT', body: file }, progress => {
        const total = ((progress.loaded / progress.total) * 100) | 0;
        postMessage({ status: FILEUPLOADER_MESSAGES_TYPE.UploadProgress, total });
      });
      postMessage({ status: FILEUPLOADER_MESSAGES_TYPE.Done });
    } catch (e) {
      console.error(e);
      postMessage({ status: FILEUPLOADER_MESSAGES_TYPE.Fail });
    }
  }
  /**
   *
   * @param {string} url
   * @param {RequestInit} opts
   * @param {(progress:ProgressEvent)=>void} onProgress
   * @returns {Promise<ProgressEvent>}
   */
  futch(url, opts = {}, onProgress) {
    return new Promise((res, rej) => {
      this.xhr = new XMLHttpRequest();
      this.xhr.open(opts.method || 'get', url);
      for (var k in opts.headers || {}) if (opts.headers) this.xhr.setRequestHeader(k, opts.headers[k]);
      //@ts-ignore
      this.xhr.onload = e => {
        if (e && e.currentTarget && e.currentTarget.status == "200") {
          res(e)
        } else {
          rej(e)
        }
      };
      this.xhr.onerror = e => rej(e);
      if (this.xhr.upload && onProgress) this.xhr.upload.onprogress = (e) => { onProgress(e) }; // event.loaded / event.total * 100 ; //event.lengthComputable
      this.xhr.send(opts.body);
    });
  }
}
const uploader = new Uploader()
addEventListener('message', ({ data }) => {
  if (data == serviceMessageType.Abort && uploader.xhr) {
    uploader.xhr.abort()
    postMessage({ status: FILEUPLOADER_MESSAGES_TYPE.Aborted });
    return
  }
  else if (data.id != undefined) {
    uploader.id = data.id;
    postMessage({ status: FILEUPLOADER_MESSAGES_TYPE.IdRecived });
  } else if (uploader.id != undefined) {
    if (data.file && data.link) {
      uploader.uploadFile(data.file, data.link);
    }
  }
});