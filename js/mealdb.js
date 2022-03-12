const searchFoodButton = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;

    // if search field value empty string then stop function will function and not show anything
    if (searchFieldText === '') {
        return;
    }

    // if search field value not empty string 
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.meals, searchFieldText))
    }

}


// উপরে ডাইনামিক লিংক ক্রিয়েট করে সেখান থেকে যা গেট করছি ওটাকে এই ফাংশনে ইনপুট হিসেবে দেয়া হচ্ছে।
const displaySearch = (meals, searchFieldText) => {

    // ডাইনামিক লিংক থেকে পাওয়া প্রয়োজনীয় জিনিশ এখানে সেট করা হচ্ছে।
    const setSearchResult = document.getElementById('set-search-result');
    setSearchResult.textContent = '';
    // প্যারামিটারের উপর লুপ চালিয়ে একটা এরো ফাংশন ক্রিয়েট করা হইছে। এবং ফাংশনে প্যারামিটার লুপ করে করে তারপর পাঠানো হচ্ছে।
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


const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals))
}


const displayMealDetail = mealsDetail => {
    console.log(mealsDetail)
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