"use strict";

class MobileMenu {
  constructor() {
    this.isHidden = false;
  }

  showMenu() {
    this.isHidden = !this.isHidden;

    const nav = document.getElementsByTagName("nav")[0];

    Array.from(nav.children).forEach((element) => {
      element.hidden = this.isHidden;
    });
  }
}

const menu = new MobileMenu();
