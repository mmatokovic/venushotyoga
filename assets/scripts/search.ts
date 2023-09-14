document.addEventListener("DOMContentLoaded", () => {
  for (const e of document.getElementsByClassName("js-only") as HTMLCollectionOf<HTMLElement>) {
    e.classList.remove("js-only");
  }

  const posts = document.querySelectorAll("#post") as NodeListOf<HTMLLIElement>;
  const search = document.getElementById("Search") as HTMLInputElement;
  //const oldheading = document.getElementById("newest-posts") as HTMLElement;
  //const clearSearch = document.getElementById("clear-search") as HTMLElement;
  const artlist = document.getElementById("artlist") as HTMLElement;

  search.addEventListener("input", () => {
    // grab search input value
    const searchText: string = search.value.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}/gu, "");
    const searchTerms: string[] = searchText.split(" ");
    const hasFilter: boolean = searchText.length > 0;

    artlist.classList.toggle("list-searched", hasFilter);
    // oldheading.classList.toggle("hidden", hasFilter);

    // for each post hide all but matched
    posts.forEach(post => {
      const searchString: string = `${post.textContent} ${post.dataset.tags}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
      const isMatch: boolean = searchTerms.every(term => searchString.includes(term));

      post.hidden = !isMatch;
      post.classList.toggle("matched-post", hasFilter && isMatch);
    })
  })

  // delete text in input field
  // clearSearch.addEventListener("click", () => {
  //   search.value = "";
  //   posts.forEach(post => {
  //     post.hidden = false;
  //     post.classList.remove("matched-post");
  //   })

  //   artlist.classList.remove("list-searched");
  //   oldheading.classList.remove("hidden");
  // })
})