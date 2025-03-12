function removeActiveClass() {
    const buttons = document.getElementsByClassName('active');

    for (let btn of buttons) {
        btn.classList.remove('active');
    }
}

function loadCategories() {
    //? 1- fetch data from the server

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        //? 2-  convert the response to json
        .then((res) => res.json())
        //? 3 - display the data
        .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = '') {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('active');

            displayVideos(data.videos)

        });
}

function loadCategoriesVideos(id) {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            // console.log(data);


            const clickedButton = document.getElementById(`btn-${id}`);

            removeActiveClass();
            clickedButton.classList.add('active');

            // console.log(clickedButton);

            displayVideos(data.category)
        });
}

const loadVideoDetails = (videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            displayVideoDetails(data.video);
        });
}


const displayVideoDetails = (video) => {
    // console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        <figure>
            <img src="${video.thumbnail}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
            <p>${video.description}</p>        
        </div>
    </div>
    `;
}

/**
 *  {
    "category_id": "1001",
    "category": "Music"
    }
 */

//todo display the categories
function displayCategories(categories) {
    // console.log(categories);
    //? get the container
    const container = document.getElementById('category-container');


    //? loop Operation On array of objects
    for (let cat of categories) {
        // console.log(cat.category);
        // console.log(cat.category_id);

        //?create element
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category} </button>
        `

        //?append the element to the container
        container.appendChild(categoryDiv);
    }

}

/**
 * {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
 */

//todo display the videos
const displayVideos = (videos) => {
    // console.log(videos);
    //? get the container
    const vidContainer = document.getElementById('video-container');


    //? Clear the Video container
    vidContainer.innerHTML = '';

    //* console.log(videos.length); // it will return the number of videos in the array of objects

    if (videos.length === 0) {
        vidContainer.innerHTML = `
        <div class="col-span-full text-center flex flex-col items-center justify-center space-y-5 py-20">
                <img src="assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
        return;
    }

    //? loop Operation On array of objects
    videos.forEach(video => {
        // console.log(video);
        //?create element
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
                    <div class="card bg-base-100">

                <!--? Image -->
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="thumbnail" />
                    <span class="absolute bottom-2 right-2 text-white bg-[#171717] px-2 text-sm rounded">3hrs 56 min
                        ago</span>
                </figure>

                <!--? Content -->
                <div class="flex gap-5 px-0 py-5 ">

                    <!--? Profile Image-->
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">

                                <img src="${video.authors[0].profile_picture}" alt="Authors Profile Picture" />

                            </div>
                        </div>
                    </div>

                    <!--? Profile Details -->
                    <div class="intro space-y-2">
                        <h2 class="text-base font-bold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1 ">${video.authors[0].profile_name}
                            ${video.authors[0].verified ? `<img class="w-5 h-5 rounded-full"
                                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ''}
                        </p>

                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>

                    <div>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
            </div>

                `;


        //?append the element to the container
        vidContainer.appendChild(videoCard);
    });
}


document.getElementById('search-input').addEventListener('keyup', (e) => {
    const input = e.target.value;
    loadVideos(input);
});

//? call the function
loadCategories();