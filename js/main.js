/* Global Varibales */
// Random Background Option
let backgroundoption = true;
// Control Interval
let backgroundInterval;

// If Local Storage Not Null
if (localStorage.getItem("color_option") !== null) {
    // Get Color From LocalStorage To Set On Main Color
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"))
    // Remove Active Class From All Bullets List
    document.querySelectorAll(".colors-list li").forEach(li => {
        li.classList.remove("active")
        // Add Active Class To The Same Color On Local Storage
        if (li.dataset.color ===  localStorage.getItem("color_option")) {
            // Add Actvie Class
            li.classList.add("active")
        }
    })
}

// If Background Option On LocalStorage Equal False
if (localStorage.getItem("background_option") === "false") {
    // Change Background Option To False
    backgroundoption = false;
    // remove Class Active To "Yes" Button
    document.querySelector(".random-backgrounds .yes").classList.remove("active")
    // Add Class Active To "No" Button
    document.querySelector(".random-backgrounds .no").classList.add("active")
    if (localStorage.getItem("stop_background") !== null) {
        document.querySelector(".landing-page").style.backgroundImage = `url("photo/${localStorage.getItem("stop_background")}")`
    }
    
}   

// Toggle spin class on Icon And Open Settings Box
window.addEventListener("click", (e) => {
    if (0 <= e.clientX && e.clientX < 250 
        && document.querySelector(".settings-box").className === "settings-box open") {
        // add class open
        document.querySelector(".settings-box").classList.add("open")
        // add Spin On Icon
        document.querySelector(".gear-icon").classList.add("fa-spin")
        // add class Open Icon
        document.querySelector(".setting-icon").classList.add("open-icon")
    } else {
        // remove class open
        document.querySelector(".settings-box").classList.remove("open")
        // remove Spin On Icon
        document.querySelector(".gear-icon").classList.remove("fa-spin")
        // remove class Open Icon
        document.querySelector(".setting-icon").classList.remove("open-icon")
    }
})
// When Click Setting Icon
document.querySelector(".setting-icon").addEventListener("click", () => {
    // Toggle class open
    document.querySelector(".settings-box").classList.toggle("open")
    // Toggle Spin On Icon
    document.querySelector(".gear-icon").classList.toggle("fa-spin")
    // Toogle class Open Icon
    document.querySelector(".setting-icon").classList.toggle("open-icon")
})

// Switch Color
const colorsList = document.querySelectorAll(".colors-list li")
// Loop List Items
colorsList.forEach(li => {
    // Click On List Items
    li.addEventListener("click", e => {
        // Set Color On Main Color
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        // Set Color To LocalStorage
        localStorage.setItem("color_option", e.target.dataset.color)
        // Remove Class Active To Bullets
        colorsList.forEach(li => {
            li.classList.remove("active")
        })
        // Add Class Active On Target Bullet
        e.target.classList.add("active")
    });
});

// Change Background Image Auto
let landingPage = document.querySelector(".landing-page")
// Array Images
let arrayImages = ["background-1.jpg", "background-2.jpg", "background-3.jpg", "background-4.jpg", "background-5.jpg",]
let i = 0;
function switchImage() {
    landingPage.style.backgroundImage = `url("photo/${arrayImages[i]}")`
    i++
    // When i Equal arra.y length update i to restore the function
    if (i === arrayImages.length) {
        i = 0
    }
}

// Control Background
const backgroundItems = document.querySelectorAll(".random-backgrounds span")
// Loop List Items
backgroundItems.forEach(el => {
    // Click On Button Items
    el.addEventListener("click", e => {
        // Remove Class Active From All Button
        backgroundItems.forEach(el => {
            el.classList.remove("active")
        })
        // Add Class Active On Target Button
        e.target.classList.add("active")
    });
});

// If Background Option True Start Switch 
if (backgroundoption === true) {
    backgroundInterval = setInterval(switchImage, 10000)
}

// When Click On Yes Button 
document.querySelector(".random-backgrounds .yes").addEventListener("click", () => {
    // Return Background Option To True
    backgroundoption = true;
    // Start Switch backround Image
    backgroundInterval = setInterval(switchImage, 10000);
    // Save To LocalStorage
    localStorage.setItem("background_option", backgroundoption);
})
// When Click On No Button
document.querySelector(".random-backgrounds .no").addEventListener("click", () => {
    // Change Background Option To False
    backgroundoption = false;
    // Stop Switch backround Image
    clearInterval(backgroundInterval);
    // Save To LocalStorage
    localStorage.setItem("background_option", backgroundoption);
    // Save Background Stop
    if (i !== 0) {
        localStorage.setItem("stop_background", arrayImages[i - 1])
    } 
})

// Animation 
let ourSkills = document.querySelector(".our-skills");

addEventListener("scroll", () => {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skill Outer Height
    let skillOuterHeight = ourSkills.offsetHeight;
    // window Height
    let windowHeight = this.innerHeight;
    // window scrollTop
    let windowScrollTop = this.scrollY + 20;
    // When Reached To Section Our Skills
    if (windowScrollTop > skillsOffsetTop + skillOuterHeight - windowHeight) {
        let skills = document.querySelectorAll(".skill-box .skill-progress")
        skills.forEach(skill => {
            skill.firstElementChild.style.width = skill.firstElementChild.dataset.progress;
            skill.lastElementChild.innerHTML = skill.firstElementChild.dataset.progress;
            skill.lastElementChild.style.display = "block"
            skill.lastElementChild.style.left = skill.firstElementChild.dataset.progress;
            if (skill.firstElementChild.dataset.progress === "100%") {
                skill.firstElementChild.style.borderRadius = "6px"
            }
        })
    }
})


/* Enlarge The Photo */
let images = document.querySelectorAll(".our-gallery .images-box")
images.forEach(img => {
    img.addEventListener("click", (e) => {
        // Popup Overlay
        let popupOvelay = document.createElement("div")
        // Add Class Name To Overlay
        popupOvelay.classList.add("popup-overlay");
        // Append Element To Body
        document.body.appendChild(popupOvelay)
        // Popup Box
        let popupBox = document.createElement("div")
        // Add Class Name To Popup Box
        popupBox.classList.add("popup-box");
        // When Alt Atribute for Image Not Null
        if (e.target.alt !== null) {
            // Create Image Name
            let imageName = document.createElement("h3")
            // Name Image From Alt Atribute
            imageName.textContent = e.target.alt;
            // Appen To Popup Box
            popupBox.appendChild(imageName)
        }
        // Create Image
        let popupImage = document.createElement("img")
        // Add Image To popup Box
        popupImage.src = e.target.src
        // Append Image To popup Box 
        popupBox.appendChild(popupImage)
        // Append Popup Box To Body 
        document.body.appendChild(popupBox)
        // Button Close
        let buttonClose = document.createElement("span")
        // Add Class Name To Button
        buttonClose.className = "button-close"
        // Add Icon Close To Span
        buttonClose.textContent = "X"
        // Append To Popup Box
        popupBox.appendChild(buttonClose)
    })
})
// Click To Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className === "button-close") {
        // Remove Popup
        e.target.parentElement.remove()
        // Remove Overlay 
        document.querySelector(".popup-overlay").remove()
    }
})

// Select All links 
let links = document.querySelectorAll(".links a")
let bullets = document.querySelectorAll(".bullets .bullet")

// Scroll Section
function scrollToSection(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault()
            // Scroll To Sction By Smoothy Scroll
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            })
        })
    })
}

scrollToSection(links)
scrollToSection(bullets)

// Nav Bullets option
let bulletsspan = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".bullets");
let localStorageBullets = localStorage.getItem("bullet-option")

if (localStorageBullets !== null) {
    bulletsspan.forEach((e) => {
        e.classList.remove("active")
    })
    if (localStorageBullets === "block") {
        navBullets.style.display = "block"
        document.querySelector(".bullets-option .show").classList.add("active")
    } else {
        navBullets.style.display = "none"
        document.querySelector(".bullets-option .hide").classList.add("active")
    }
}

bulletsspan.forEach((el) => {
    el.addEventListener("click", (e) => {
        if (e.target.className === "active show" || e.target.className === "show") {
            navBullets.style.display = "block"
            localStorage.setItem("bullet-option", "block")
        } else {
            navBullets.style.display = "none"
            localStorage.setItem("bullet-option", "none")
        }
        bulletsspan.forEach((e) => {
            e.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})

// Restart Option
let restOption = document.querySelector(".reset-options");

restOption.addEventListener("click", (e) => {
    localStorage.clear()
    window.location.reload()
})

// toggle menu 
let menu = document.querySelector(".toggle-menu");
let listLinks = document.querySelector(".links")
// Clcik menu
menu.addEventListener("click", (e) => {
    listLinks.classList.toggle("open")  
})
// When Click Out Side Menu
window.addEventListener("click", (e) => {
    if (e.target !== menu) {
        listLinks.classList.remove("open")
    }
})