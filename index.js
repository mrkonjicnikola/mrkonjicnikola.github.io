// Preview carousel media — drop files into assets/images/projects/<key>-preview/ and list filenames here
const PREVIEW_MEDIA = {
    'expo-vr': [
        '0.mp4',
        '1.mp4',
        '2.mp4',
        '3.mp4',
    ],
    'ar-quiz': [
        '0.png',
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
    ],
}

let _previewProject = null
let _previewIndex = 0

function openPreview(project) {
    _previewProject = project
    _previewIndex = 0
    _renderPreview()
    document.getElementById('preview-modal').classList.add('open')
    document.addEventListener('keydown', _onPreviewKey)
}

function closePreview() {
    const video = document.querySelector('#preview-media-wrapper video')
    if (video) video.pause()
    document.getElementById('preview-modal').classList.remove('open')
    document.removeEventListener('keydown', _onPreviewKey)
}

function closePreviewIfOverlay(e) {
    if (e.target === document.getElementById('preview-modal')) closePreview()
}

function prevPreview() {
    const items = PREVIEW_MEDIA[_previewProject]
    _previewIndex = (_previewIndex - 1 + items.length) % items.length
    _renderPreview()
}

function nextPreview() {
    const items = PREVIEW_MEDIA[_previewProject]
    _previewIndex = (_previewIndex + 1) % items.length
    _renderPreview()
}

function _onPreviewKey(e) {
    if (e.key === 'Escape') closePreview()
    else if (e.key === 'ArrowLeft') prevPreview()
    else if (e.key === 'ArrowRight') nextPreview()
}

function _renderPreview() {
    const items = PREVIEW_MEDIA[_previewProject]
    const wrapper = document.getElementById('preview-media-wrapper')
    const counter = document.getElementById('preview-counter')
    const controls = document.querySelector('.preview-controls')
    const navBtns = document.querySelectorAll('.preview-nav-btn')

    const prevVideo = wrapper.querySelector('video')
    if (prevVideo) prevVideo.pause()

    if (!items || items.length === 0) {
        wrapper.innerHTML = '<p class="preview-empty">No previews yet.</p>'
        counter.textContent = ''
        controls.style.display = 'none'
        return
    }

    const filename = items[_previewIndex]
    const src = `./assets/images/projects/${_previewProject}-preview/${filename}`
    const ext = filename.split('.').pop().toLowerCase()
    const isVideo = ['mp4', 'webm', 'mov'].includes(ext)

    wrapper.innerHTML = isVideo
        ? `<video controls autoplay loop src="${src}"></video>`
        : `<img src="${src}" alt="Preview ${_previewIndex + 1}" />`

    counter.textContent = `${_previewIndex + 1} / ${items.length}`
    controls.style.display = 'flex'
    navBtns.forEach(b => b.style.display = items.length <= 1 ? 'none' : 'flex')
}

// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

gsap.to(".reveal-hero-text", {
    opacity: 0,
    y: "100%",
})

gsap.to(".reveal-hero-img", {
    opacity: 0,
    y: "100%",
})


gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})


window.addEventListener("load", () => {
    // animate from initial position
    gsap.to(".reveal-hero-text", {
        opacity: 1,
        y: "0%",
        duration: 0.8,
        // ease: "power3.out",
        stagger: 0.5, // Delay between each word's reveal,
        // delay: 3
    })

    gsap.to(".reveal-hero-img", {
        opacity: 1,
        y: "0%",
    })

    
})


// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", // top of trigger hits the top of viewport
                                                            end: "20% 90%",
                                                            // markers: true,
                                                            // scrub: 1,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})



