const searchButton = document.getElementById("button-search");
const searchField = document.getElementById("search-field");

// function 04: search by enter key
searchField.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }

});


// Function 01:
const searchFoodButton = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = '';

    // if search field value empty string then stop function will function and not show anything
    if (searchFieldText === '') {
        return;
    }

    // if search field value not empty string then function continue
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.meals, searchFieldText))
    }

}


// Function 02:
// উপরের API কে ডাইনামিক API তে কনভার্ট করে সেখান থেকে যা গেট করছি ওটাকে এই ফাংশনে প্যারামিটার হিসেবে দেয়া হচ্ছে।
const displaySearch = (meals) => {

    // এখানে API থেকে পাওয়া প্রয়োজনীয় জিনিশ Append করবো।
    const setSearchResult = document.getElementById('set-search-result');

    // প্রত্যেকবার Append করার আগে UI Empty করে দিবো।
    setSearchResult.textContent = '';

    // প্যারামিটারের উপর For Each চালিয়ে তার ভেতর একটা Arrow Function ক্রিয়েট করা হয়েছে। এবং ঐ Arrow Function এর প্যারামিটার হিসেবে For Each  করে পাওয়া প্রত্যেকটা এলিমেন্টকে পাঠানো হয়েছে।
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="col">
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(1, 200)}</p>
                </div>
             </div>
        </div>
    `;
        setSearchResult.appendChild(div);
    })
}


// মিল এর ডিটেইলস লোড করা হয়েছে।
const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals))
}


// Function: 03
// মিল এর ডিটেইলস UI তে শো করানো হয়েছে।
const displayMealDetail = mealsDetail => {
    // console.log(mealsDetail)
    const setMealDetail = document.getElementById('set-meal-details')
    setMealDetail.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
            <img src="${mealsDetail[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${mealsDetail[0].strMeal}</h5>
                <p class="card-text">${mealsDetail[0].strInstructions.slice(1, 200)}.</p>
                <a href="${mealsDetail[0].strYoutube}" class="btn btn-primary">Go YouTube</a>
            </div>
    `
    setMealDetail.appendChild(div);

}