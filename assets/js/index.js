window.changeClass = function(){
    document.getElementById("MyElement").classList.toggle('MyClass');
}

window.changeDisplay = function(){
    document.getElementById('mobile-menu').toggleAttribute("hidden");
    document.getElementById('open').toggleAttribute("hidden");
    document.getElementById('notopen').toggleAttribute("hidden");
}

function areaTrigger(x){
    const theTrigger = document.getElementById('mobile-form-control');
    const theForm = document.querySelectorAll('.l-header__mobile-form');

    // Assuming x in your for-loop is the element you want to toggle the aria-expanded attribute on:
    for (const x of theForm) {
        x.classList.toggle('show');
        x.setAttribute('aria-expanded', x.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    for (e of document.getElementsByClassName("js-only")) {
        e.classList.remove("js-only");
    }
    const recipes = document.querySelectorAll("#artlist #post");
    const search = document.getElementById("search");
    const oldheading = document.getElementById("newest-posts");
    const artlist = document.getElementById("artlist");
    
    search.addEventListener("input", () => {
        // grab search input value
        const searchText = search.value.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const searchTerms = searchText.split(" ");
        const hasFilter = searchText.length > 0;
    
        artlist.classList.toggle("list-searched", hasFilter);
        oldheading.classList.toggle("hidden", hasFilter);
    
        // for each recipe hide all but matched
        recipes.forEach(recipe => {
        const searchString = `${recipe.textContent} ${recipe.dataset.tags}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const isMatch = searchTerms.every(term => searchString.includes(term));
    
        recipe.hidden = !isMatch;
        recipe.classList.toggle("matched-recipe", hasFilter && isMatch);
        })
    })
})
