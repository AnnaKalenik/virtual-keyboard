// import getTemplate from './templateKeyboard.js';
import arrRows from './en.js';

const getTemplate = () => {
    return  `
    <div class="container">
    <h1 class="title">Virtual keyboard</h1>
    <div class="keyboard__wrapper">
        <div class="keyboard__textarea">
            <textarea name="text" class="keyboard__text" id="text"></textarea>
        </div>
        <div class="keyboard__keys"></div>
    </div>
    `
}

export default class Keyboard {
    constructor(keysArr, keys, functionKeys) {
        this.keysArr = keysArr;
        this.keys = keys;
        this.functionKeys = functionKeys;
        this.$body = document.querySelector('body');
        this.flag = false;

        this.#render();

        this.$textArea = this.$body.querySelector('#text');
        this.value = this.$textArea.value;

        this.keyHandler();
        this.klickHandler();
        this.toogleLanguage();
    }

    #render() {
        this.$body.innerHTML = getTemplate();
        this.#createKeys();
    }



    #createKeys() {
        this.$keysContainer = this.$body.querySelector('.keyboard__keys');

        //создаем 5 строк
        for (let i = 1; i <= 5; i++) {
            this.$row = document.createElement('div');
            this.$row.classList.add('keyboard__row', `row${i}`);
            this.$keysContainer.append(this.$row); 
        }

        //создаем в строках keys
        for (let i = 0; i < 5; i++) {
            this.$row = this.$keysContainer.querySelector(`.row${i + 1}`);

            arrRows[i].forEach(key => {
                this.$key = document.createElement('div');
                this.$key.classList.add('key', `${key.code.toLocaleLowerCase()}`);
                this.$key.setAttribute('key-code', `${key.code}`);
                this.$row.append(this.$key);
    
                this.$key.innerHTML = `${key.small}`;

                //добавление иконок для кнопок перемещения;
                if (key.code.match(/ArrowUp|ArrowLeft|ArrowDown|ArrowRight/)) {
                    let arrow = key.code.split('').slice(5).join('').toLowerCase();
                    this.$key.innerHTML = `<i class="fa-solid fa-arrow-${arrow}"></i>`
                }
            })
        }
    }

    addTextToTextarea(event) {
        for (let i = 0; i < this.keys.length; i++) {
            if (event.code === this.keys[i] || event.target.classList[1] === this.keys[i].toLowerCase()) {
                this.activeKey = this.$body.querySelector(`.${this.keys[i].toLowerCase()}`);
                this.value += this.activeKey.innerHTML;
                this.$textArea.value = `${this.value}`;
            }
        }
    }

    keyHandler() {
        window.addEventListener('keydown', (event) => {
            for (let i = 0; i < this.keysArr.length; i++) {
                if (event.code === this.keysArr[i]) {
                    this.activeKey = this.$body.querySelector(`.${this.keysArr[i].toLowerCase()}`);
                    this.activeKey.classList.add('down');
                }
            }

            this.addTextToTextarea(event);
        })
    
        window.addEventListener('keyup', (event) => {
            for (let i = 0; i < this.keysArr.length; i++) {
                if (event.code === this.keysArr[i]) {
                    this.activeKey = this.$body.querySelector(`.${this.keysArr[i].toLowerCase()}`);
                    this.activeKey.classList.remove('down');
                }
            }
        })

    }

    klickHandler() {
        window.addEventListener('click', (event) => {
            this.addTextToTextarea(event);
        })
        
    }

    toogleLanguage() {
        window.addEventListener('keydown', (event) => {
                if(event.code === 'ShiftLeft') {
                    this.flag = true;
                }
                if(event.code === 'AltLeft' && this.flag === true) {
                    this.flag = false;
                }
        }) 
    }
}


document.addEventListener('keydown', (event) => {
    console.log(event)
})