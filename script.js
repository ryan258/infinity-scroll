console.log('testing 👻')

// Globals
let photosArray = []

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

// Unsplash API
const apiKey = 'v3WRuLj-TEmp5R2bFpg7zyIEZHEulL53CNC3AOMNy_w'
const count = 30

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Create photo elements and add them to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to Unsplash
    const item = document.createElement('a')
    item.setAttribute('href', photo.links.html)
    item.setAttribute('target', '_blank')
    // Createm <img> for photo
    const img = document.createElement('img')
    img.setAttribute('src', photo.urls.regular)
    img.setAttribute('alt', photo.alt_description)
    img.setAttribute('title', photo.alt_description)
    // Put <img> inside <a>, then put both in image-container
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Get photos from Unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    // console.log(photosArray)
    displayPhotos()
  } catch (error) {
    console.log(error)
  }
}

// async function p

// On load
getPhotos()
