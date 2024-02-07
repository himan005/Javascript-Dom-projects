const API_BASE_URL = 'localhost:4000/api/testimonials';
const PAGE_SIZE = 5
let canFetchTestimonials = true
let afterId = null

const testimonialContainer = document.getElementById('testimonial-container')

testimonialContainer.addEventListener('scroll', handleScroll)

fetchAndAppendTestimonials()

async function  fetchAndAppendTestimonials(){
    canFetchTestimonials = false
    const url = createTestimonialUrl();
    let response= await fetch(url)
    const {testimonials, hasNext} = await response.json()
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data=> console.log(data))
    //     .then(({testimonials, hasNex}) =>{
            const fragment = document.createDocumentFragment()
            testimonials.forEach(({message}) =>{
                fragment.appendChild(createTestimonialElement(message))
            })
            testimonialContainer.append(fragment)
            if(hasNext){
                afterId = testimonials[testimonials.length-1].id
            } else {
                testimonialContainer.removeEventListener('scroll', handleScroll)
            }
            canFetchTestimonials = true
        // })
        // .catch((err =>{
        //     throw new Error(err)
        // }
    // ))
}

function createTestimonialUrl(){
    const url = new URL(API_BASE_URL)
    url.searchParams.set('limit', PAGE_SIZE)
    if(afterId != null){
        url.searchParams.set('after', afterId)
    }
    return url
}

function createTestimonialElement(message){
    const testimonialElement = document.createElement('p')
    testimonialElement.classList.add('testimonial')
    testimonialElement.textContent = message
    return testimonialElement
}

function handleScroll(){
    if(!canFetchTestimonials) return
    const bottomSpaceLeftToScroll = (
        this.scrollHeight - 
        this.scrollTop - 
        this.clientHeight
    )
    if(bottomSpaceLeftToScroll > 0) return
    fetchAndAppendTestimonials()
}







