console.log('testing 👻')

// Globals
let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

// Unsplash API
const apiKey = 'v3WRuLj-TEmp5R2bFpg7zyIEZHEulL53CNC3AOMNy_w'
const count = 10

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
// vvv called for each individual image
function imageLoaded() {
  console.log('image loaded')
  imagesLoaded++
  console.log('imagesLoaded', imagesLoaded)
  if (imagesLoaded === totalImages) {
    ready = true
    console.log('ready =', ready)
  }
}

// Helper function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create photo elements and add them to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  console.log('total images:', totalImages)
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to Unsplash
    const item = document.createElement('a')
    // item.setAttribute('href', photo.links.html)
    // item.setAttribute('target', '_blank')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })
    // Createm <img> for photo
    const img = document.createElement('img')
    // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded)
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

// Check to see if scrolling near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    // console.log('load more')
    ready = false
    getPhotos()

    /*// constant
    console.log('window.innerHeight: ', window.innerHeight)
    // increases as you scroll down
    console.log('window.scrollY: ', window.scrollY)
    // also increases as you scroll down
    console.log('window.innerHeight + scrollY: ', window.scrollY + window.innerHeight)
    // stays consistant bc once the page has loaded we have the full height of all the images
    console.log('document.body.offsetHeight - 1000: ', document.body.offsetHeight - 1000)
    console.log('load more')
    */
  }
})

// On load
getPhotos()
