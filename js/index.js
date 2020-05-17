"use strict";

let months=[
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
];

function createSimpleNode(tag, className, parentNode) {
    const node = document.createElement(tag);
    node.className = className;
    return parentNode.appendChild(node);
};

function createSimpleNodeWithData(tag, className, parentNode, data) {
    const node = document.createElement(tag);
    node.className = className;
    node.innerText = data;
    return parentNode.appendChild(node);
};

class Student {
    constructor(params) {
        this.fullName = params.fullName;
        this.university = params.university;
        this.course = params.course;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
    };

    get education() {
        return this.university + ", " + this.course + " курс";
    };

    get age() {
        const exceptions = [11, 12, 13, 14, 111, 112, 113, 114];
        const agePerson = parseInt((Date.now() - this.birthDate) / 3600 / 24 / 365.25 / 1000);
        
        if ( exceptions.indexOf(agePerson) !== -1 ) {
            return agePerson + " лет";
        } else if ( (agePerson % 10) === 1 ) {
            return agePerson + " год";
        } else if ( ((agePerson % 10) === 2) || ((agePerson % 10) === 2) || ((agePerson % 10) === 2) ) {
            return agePerson + " года";
        }
        
        return agePerson + " лет";
    };

    get birthDateStr() {
        return this.birthDate.getDate() + " " + months[this.birthDate.getMonth()];
    };

    render() {
        const person = document.createElement("div");
        person.className = "person";
        
        const avatar = document.createElement("img");
        avatar.className = "person__avatar";
        avatar.setAttribute("src", this.photoUrl);
        person.appendChild(avatar);
    
        const name = document.createElement("span");
        name.className = "person__name";
        name.innerText = this.fullName;
        person.appendChild(name);
    
        const education = document.createElement("span");
        education.className = "person__education";
        education.innerText = this.education;
        person.appendChild(education);
    
        return person;
    };

    appendToDOM()  { 
        const layout = this.render();
        const persons = document.getElementById("persons");
        persons.appendChild(layout);

        layout.addEventListener('click', (event) => {
            this.openCard(event.currentTarget);
        });
    }; 

    openCard (currentTarget) {
        const persons = document.getElementById("persons");
        const x = currentTarget.offsetTop;
        const y = currentTarget.offsetLeft;

        const page = document.getElementById("page");
            page.style.backgroundColor = "#808080";
      
        const personPopup = createSimpleNode("div","personPopup", persons);
            personPopup.style.left = y + "px";
            personPopup.style.top = x + "px ";
        
        const personPopupInfo = createSimpleNode("div","personPopup__info", personPopup);
            createSimpleNodeWithData("span", "personPopup__name ", personPopupInfo, this.fullName);

        const personPopupWrap = createSimpleNode("div", "personPopup__wrap", personPopupInfo);
            createSimpleNodeWithData("div", "personPopup__caption", personPopupWrap, "День рождения");
            createSimpleNodeWithData("div", "personPopup__birthDate", personPopupWrap, this.birthDateStr + ", " + this.age);
            createSimpleNodeWithData("div", "personPopup__caption", personPopupWrap, "Учится");
            createSimpleNodeWithData("div", "personPopup__education", personPopupWrap, this.education);

        const personPopupAvatar = createSimpleNode("img","personPopup__avatar", personPopup);
            personPopupAvatar.setAttribute("src", this.photoUrl);

        const personPopupExit = createSimpleNodeWithData("div", "personPopup__exit", personPopup, "X");
            personPopupExit.style.left = 550 + "px";
            personPopupExit.style.top = 5 + "px ";
            personPopupExit.addEventListener("click", () => {
                personPopup.style.display = "none";
                page.style.backgroundColor = "#fff";
            });

        document.addEventListener('mousedown', function(e){
            if(e.target.closest('.personPopup') === null){
                personPopup.style.display = 'none';
                page.style.backgroundColor = "#fff";
            }
        });

        /* 
        Вот это не работает. Почему? (popupIsActive - булева переменная, она была инициализирована, просто уже убрал)
        этот if работает параллельно с первым кликом по котору мы попадаем в openCard, хотя по логике не должен
        if (popupIsActive) {
            document.onclick = function(event) {
                if ( event.target.className !== 'personPopup' ) {
                    personPopup.style.display = 'none';
                };
            };
        };*/
    };
};

const studentArr = [
    {
        fullName: 'Вася Иванов',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 0, 1),
        photoUrl: "img/person/ava01.jpg"
    },
    {
        fullName: 'Маша Сидорова',
        university: 'МГУ',
        course: 4,
        birthDate: new Date(2009, 0, 1),
        photoUrl: "img/person/ava02.jpg"
    },
    {
        fullName: 'Вася Иванов',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(1999, 0, 1),
        photoUrl: "img/person/ava03.jpg"
    },
    {
        fullName: 'Вася Иванов',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(1998, 0, 1),
        photoUrl: "img/person/ava04.jpg"
    },
    {
        fullName: 'Вася Иванов',
        university: 'НГУ',
        course: 2,
        birthDate: new Date(2000, 6, 11),
        photoUrl: "img/person/ava05.jpg"
    },
    {
        fullName: 'Вася Иванов',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 0, 1),
        photoUrl: "img/person/ava06.jpg"
    }
];

studentArr.forEach((item) => {
    const student = new Student(item);
    student.appendToDOM();
});