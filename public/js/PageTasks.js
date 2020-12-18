const cardDiv = document.querySelectorAll('.card')
const cardActive = document.querySelectorAll('.cardActive')
cardDiv.forEach((element, index) => {
    if(index > 2){
        element.classList.remove('cardActive')
        element.classList.add('hidden')
    }
});

document.getElementById('proximo').addEventListener('click', function(){
    let ultimoCardAtivo = cardActive[cardActive.length-1]
    console.log(ultimoCardAtivo)
})

