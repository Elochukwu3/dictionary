//  declarations

let wordContent = document.querySelector("#word");
let infoText = document.querySelector(".info-text");
let phoneticSymbol = document.querySelector("#phonetics_symbols");
let volume = document.querySelector(".audio");
let verbMeaning = document.querySelector(".verb_meaning");
let nounMeaning = document.querySelector(".noun_meaning");
let prebMeaning = document.querySelector(".prep_meaning");
let verbPartOfSpeech = document.querySelector("#part_of_speechVerb")
let nounPartOfSpeech = document.querySelector("#part_of_speechNoun")
let prePartOfSpeech = document.querySelector("#part_of_speechPrep");
let verbExample = document.querySelector(".verb_example");
let nounExample = document.querySelector(".noun_example");
let prepExample = document.querySelector(".prep_example");
let verbSimilar = document.querySelector(".verb_similar");
let nounSimilar = document.querySelector(".noun_similar");
let prepSimilar = document.querySelector(".prep_similar");

let searchInpt = document.querySelector("#input_search");
let overAll = document.querySelector(".word_container");

const displayResult = (result, word) =>{
    let audioTrans;
    // console.log(result);
    if (result.title)  {
        infoText.innerHTML =`Can't find the word <span>"${word}"</span>, please try search another word`
        let infoSpan = document.querySelector(".info-text span");
            infoSpan.style.color = "red";   
            overAll.style.color= "grey"; 
            alert(`couldn't find the word "${word}" search another word`)      
}
else{
    overAll.style.color= "#ffff"; 
    wordContent.innerHTML = result[0].word;
    let shortForm = result[0].meanings[0].definitions[0];
    phoneticSymbol.innerHTML = result[0].phonetic;
    nounPartOfSpeech.innerHTML= result[0].meanings[0].partOfSpeech;
    nounMeaning.innerHTML = shortForm.definition;
    verbPartOfSpeech.innerHTML = result[0].meanings[1].partOfSpeech;
    verbMeaning.innerHTML = result[0].meanings[1].definitions[0].definition;
    
    

   
    audioTrans = new SpeechSynthesisUtterance(result[0].word);
    volume.addEventListener("click", ()=>{
        speechSynthesis.speak(audioTrans);
        audioTrans = "";
        // speechSynthesis.speak();
        
    })


    let prepUndefine = result[0].meanings[2].partOfSpeech;
    let prepMeanUndefine = result[0].meanings[2].definitions[0].definition;
    if (prePartOfSpeech.innerHTML == undefined ) {
        prePartOfSpeech.style.display = "none";
        prepMeanUndefine.style.display = "none";
    }else{
        prePartOfSpeech.innerHTML = result[0].meanings[2].partOfSpeech;
        prebMeaning.innerHTML = result[0].meanings[2].definitions[0].definition;
    }
// //    let phoneUndefine = result[0].phonetic;
// if (phoneticSymbol.innerHTML === "undefined") {
//     phoneticSymbol.style.display = "none"
// }else{
//     phoneticSymbol.innerHTML = result[0].phonetic;
// }
    let nounSimila = shortForm;
    let verbSimila =  result[0].meanings[0].definitions[0];
    if (nounSimila.synonyms[0] == undefined) {
        nounSimilar.style.display = "none";
    } else {
        nounSimilar.innerHTML= " ";
    for (let index = 0; index < 5; index++) {
        let synonymsArray = `<button>${result[0].meanings[0].synonyms[index]}</button>,`;
        nounSimilar.insertAdjacentHTML("beforeend", synonymsArray);
     
    };
    }

   if (verbSimila.synonyms[0] == undefined) {
    verbSimilar.style.display = "none";
    
   } else {
    verbSimilar.innerHTML = ""
    for (let index = 0; index < 6; index++) {
        let synonymsArray = `<button onclick= search(${result[0].meanings[1].synonyms[index]})>${result[0].meanings[1].synonyms[index]}</button>,`;
        verbSimilar.insertAdjacentHTML("beforeend", synonymsArray);
     
    };
   }
    

     
    let example1 = result[0].meanings[1].definitions[0].example;//verb
    let example2 = result[0].meanings[0].definitions[0].example;//noun
    let example3 = result[0].meanings[2].definitions[0].example;//prep

    //  for verb
    if (example1 == undefined) {
        verbExample.style.display = "none"
        // console.log("hee");
    }else{
        verbExample.style.display = "block"
        verbExample.innerHTML = ` eg: "${example1}"`
    };
    // for Noun
    if (example2 == undefined) {
        nounExample.style.display = "none";
    }else{
        nounExample.style.display = "block"
        nounExample.innerHTML =` eg: "${ result[0].meanings[0].definitions[0].example2}"`;
    };
    //  for preposition
    if (example3 == undefined) {
       prepExample.style.display = "none";
        // console.log("hee");
    }else{
        prepExample.style.display = "block";
       prepExample.innerHTML = ` eg: "${example3}"`
    }

    

    
}


}

function search(word) {
    searchInpt.value = word ;
    fetchApi(word);
}
function fetchApi(word) {
    
    infoText.style.color ="#ffff";
  infoText.innerHTML =`Search the meaning of the word<span>"${word}"</span>`
    let fetchLink = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(fetchLink).then((m)=>{
        
        return m.json();
    }).then((result)=>{
        displayResult(result, word)
    });

    
}




   
    // searchInpt.addEventListener("keyup", (e)=>{
            
    //         if (e.key ==="Enter" && inputValue) {
    //             fetchApi(e.target.value)
    //         }
    //     });
        function clicking() {
            let inputValue = searchInpt.value;
            if (searchInpt.value === "") {
                alert("input word to search")
            }else{
                fetchApi(inputValue)
                
            }
        }
        
// console.log(audioTrans);
        
// })
// searchInpt.addEventListener("keyup", (e)=>{
//     let inputValue = e.target.value;
//     if (e.key === "Enter" && inputValue) {
//         fetchApi(e.target.value)
//     }
// })
window.alert("Hey input word and Click on the button to Search for words")
