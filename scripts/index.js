function loadCategories() {
    //? 1- fetch data from the server

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        //? 2-  convert the response to json
        .then((res) => res.json())
        //? 3 - display the data
        .then((data) => displayCategories(data.categories));
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos));
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
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category} </button>
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

                                <img src="${video.authors[0].profile_picture}"
                                    alt="Authors Profile Picture" />

                            </div>
                        </div>
                    </div>

                    <!--? Profile Details -->
                    <div class="intro space-y-2">
                        <h2 class="text-base font-bold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1 ">${video.authors[0].profile_name} 
                        <img class="w-5 h-5 rounded-full"
                                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                        </p>

                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>

                </div>

            </div>
                `
        //?append the element to the container
        vidContainer.appendChild(videoCard);
    });
}

//? call the function
loadCategories();
