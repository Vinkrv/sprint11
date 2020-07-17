export class UserInfo {
    constructor(nameElement, infoElement, nameInput, infoInput) {
        this.nameElement = nameElement;
        this.infoElement = infoElement;
        this.nameInput = nameInput;
        this.infoInput = infoInput;
    }

    setUserInfo(nameElement , infoElement) {
       this.nameInput.value = nameElement.textContent;
       this.infoInput.value = infoElement.textContent;
    }

    updateUserInfo(nameInput , infoInput) {
        this.nameElement.textContent = nameInput;
        this.infoElement.textContent = infoInput;
    }
}