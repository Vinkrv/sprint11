export class CardList {

    constructor(container, renderingCallback) {
        
        this.container = container;
        this.renderingCallback = renderingCallback;
        
    }

    //addCard для добавления карточки в список, принимает на вход экземпляр карточки;
        
    addCard(name , link, popupPicture){
        const card = this.renderingCallback(name , link, popupPicture);
        this.container.appendChild(card);
    
   }

    //render для отрисовки карточек при загрузке страницы.
    render(initial) {
        initial.forEach(card => {
            this.addCard(card.name , card.link);
          })
    }

};