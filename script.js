const textarea = document.querySelector(".card-textarea");
const cardChooices = document.querySelector(".card-choices");
const cardAlert = document.querySelector(".card-alert");

textarea.addEventListener("keyup",(e) => {
    if(e.key == "Enter"){
        pickRandomChoice();
    }
    divideSentence();
});

function divideSentence(){
    let dividedSentence = textarea.value.split(",").map((item) => {
        return item.trim();
    });

    addSentencesToUI(dividedSentence);
}

function addSentencesToUI(dividedSentence){
    let html = "";

    dividedSentence.forEach((sentence) => {
        if(sentence != ""){
            html +=  `
            <div class="choice">${sentence}</div>
            `;
        }
    });

    cardChooices.innerHTML = html;
}

function pickRandomChoice(){
    if(cardChooices.children.length < 2){
        showAlert();
    }else{
        let count = 30;
        textarea.setAttribute("disabled","true");
        for(let i = 0; i < count; i++){
            setTimeout(() => {
                let choosedCard = cardChooices.children[Math.floor(Math.random() * cardChooices.children.length)];
                choosedCard.classList.add("active");
                setTimeout(() => {
                    if(i != count - 1){
                        choosedCard.classList.remove("active");
                    }else{
                        textarea.removeAttribute("disabled");
                    }
                },90)
            },i * 100);
        }
    }
}

function showAlert(){
    if(!textarea.nextElementSibling.classList.contains("card-alert")){
        let div = document.createElement("div");
        div.className = "card-alert showAlert";
        div.innerHTML = "Please add at least 2 choices.";
        textarea.insertAdjacentElement("afterend",div);

        setTimeout(() => {
            div.classList.remove("showAlert");
            setTimeout(() => {
                div.parentElement.removeChild(div);
            },500);
        },2000);
    }
}

