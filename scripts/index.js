// alert();

function loadCategories() {
    //? fetch data from the server

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        //? convert the response to json
        .then((res) => res.json())
        //? display the data
        .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
    //? get the container
    // const container = document.getElementById('categories');
    //? loop Operation On array of objects
}




loadCategories();