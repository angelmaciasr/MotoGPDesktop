"use strict";

class Circuito {
  constructor() {
    this.comprobarApiFile();
  }

  comprobarApiFile() {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      const msg = document.createElement("p");
      msg.textContent =
        "The File APIs are not fully supported in this browser.";
      document.body.appendChild(msg);
      return;
    }
    console.log("The File APIs are supported in this browser.");
  }

  leerArchivoHTML() {}
}
