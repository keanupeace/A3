localStorage.setItem("cat", "Boris");
localStorage.setItem("dog", "Gibson");

let catName = localStorage.getItem("cat");

document.querySelector('h2').innerText = catName