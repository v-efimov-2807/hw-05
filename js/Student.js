//import months from "./months.js"

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
    'Ноября',
    'Декабря',
];
    
export class Student {
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
        let date = new Date();
        let year = date.getFullYear();
        return Math.floor( year - this.birthDate.getFullYear() ) + " лет";
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
            page.style.backgroundColor = "#808080"
    
        const personPopup = createSimpleNode("div","personPopup", persons);
            personPopup.style.left = y + "px";
            personPopup.style.top = x + "px ";

        const personPopup__info = createSimpleNode("div","personPopup__info", personPopup);
            createSimpleNodeWithData("span", "personPopup__name ", personPopup__info, this.fullName);

        const personPopup__wrap = createSimpleNode("div", "personPopup__wrap", personPopup__info);
            createSimpleNodeWithData("div", "personPopup__caption", personPopup__wrap, "День рождения");
            createSimpleNodeWithData("div", "personPopup__birthDate", personPopup__wrap, this.birthDateStr + ", " + this.age);
            createSimpleNodeWithData("div", "personPopup__caption", personPopup__wrap, "Учится");
            createSimpleNodeWithData("div", "personPopup__education", personPopup__wrap, this.education);

        const personPopup__avatar = createSimpleNode("img","personPopup__avatar", personPopup);
            personPopup__avatar.setAttribute("src", this.photoUrl);

        const personPopup__exit = createSimpleNodeWithData("div", "personPopup__exit", personPopup, "X");
            personPopup__exit.style.left = 550 + "px";
            personPopup__exit.style.top = 5 + "px ";
            personPopup__exit.addEventListener("click", (e) => {
                personPopup.style.display = "none";
                page.style.backgroundColor = "#ffffff"
            });
        
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
    };
}