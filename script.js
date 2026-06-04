/* ================================================ */
/* =============== BACK BUTTON JS ================= */
/* ================================================= */
function goBack() {
  window.history.back();
}
/* =========================
   BASIC VARIABLES
========================= */

const header = document.querySelector("header");
const text = document.getElementById("festivalText");

const today = new Date();
const d = today.getDate();
const m = today.getMonth() + 1;


/* 🪔 Diwali Firework */
function diwaliEffect(){

 setInterval(()=>{

   const fire = document.createElement("div");
   fire.className = "firework";

   fire.style.left = Math.random()*100+"vw";
   fire.style.top = Math.random()*80+"vh";
   fire.style.background =
   `hsl(${Math.random()*360},100%,50%)`;

   document.body.appendChild(fire);

   setTimeout(()=> fire.remove(),1000);

 },500);
}


/* 🎄 Christmas Snow */
function christmasEffect(){

 setInterval(()=>{

   const snow = document.createElement("div");
   snow.className = "snow";

   snow.style.left = Math.random()*100+"vw";
   snow.style.animationDuration =
   (Math.random()*3+2)+"s";

   document.body.appendChild(snow);

   setTimeout(()=> snow.remove(),5000);

 },200);
}


/* 🇮🇳 Floating Flag */
function flagEffect(){

 setInterval(()=>{

   const flag = document.createElement("div");
   flag.className = "flag";

   flag.innerHTML = "🇮🇳";
   flag.style.left = Math.random()*100+"vw";

   document.body.appendChild(flag);

   setTimeout(()=> flag.remove(),5000);

 },800);
}


/* =========================
   🎉 FESTIVAL APPLY
========================= */

function setFestival(theme, message, image){

 if(header){
   header.className="";
   header.classList.add(theme);
 }

 if(text){
   text.innerHTML = message;
 }

 setFestivalImage(image);

 if(theme && theme.includes("holi")){
    startBubbleEffect();
 }

 if(theme==="diwali-theme") diwaliEffect();
 if(theme==="christmas-theme") christmasEffect();
 if(theme==="independence-theme") flagEffect();
 if(theme==="republic-theme") flagEffect();

}


/* =========================
   🎯 FESTIVAL DATABASE
========================= */

const festivalDB = [

{day:5, month:3, theme:"holi-theme", msg:"🌈 HAPPY HOLI", img:"holi.png"},

{day:5, month:9, theme:"ganesh-theme", msg:"🙏 Happy Ganesh Puja", img:"ganesh.png"},

{day:14, month:11, theme:"diwali-theme", msg:"🪔 Happy Diwali", img:"ganesh.png"},

{day:3, month:7, theme:"rath-theme", msg:"🛕 Happy Ratha Yatra", img:"ganesh.png"},

{day:15, month:8, theme:"independence-theme", msg:"🇮🇳 Happy Independence Day", img:"ganesh.png"},

{day:26, month:1, theme:"republic-theme", msg:"🇮🇳 Happy Republic Day", img:"ganesh.png"},

{day:25, month:12, theme:"christmas-theme", msg:"🎄 Merry Christmas", img:"ganesh.png"}

];


/* =========================
   CHECK FESTIVAL
========================= */

festivalDB.forEach(f=>{
 if(d===f.day && m===f.month){
   setFestival(f.theme,f.msg,f.img);
 }
});


/* =========================
   FESTIVAL IMAGE
========================= */

function setFestivalImage(image){

 if(!image) return;

 const left = document.getElementById("festivalleftImage");
 const right = document.getElementById("festivalRightImage");

 if(left && right){

   left.src = "./"+image;
   right.src = "./"+image;

   left.style.display = "block";
   right.style.display = "block";

 }

}

/* ================================================================== */
/* ================== contact form & mesage section JS =============== */
/* ================================================================== */
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    /* =============================
       GET FORM VALUES
    ==============================*/
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !location || !service || !message) {
      alert("Please fill all fields");
      return;
    }

    /* =============================
       PHONE VALIDATION
    ==============================*/
    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
      alert("Enter valid 10 digit Indian mobile number");
      return;
    }

    /* =============================
       WHATSAPP NUMBER
    ==============================*/
    const yourNumber = "919114875064";

    /* =============================
       AUTO SERIAL NUMBER
    ==============================*/
  let leadNo = localStorage.getItem("leadNo") || 0;
leadNo++;

localStorage.setItem("leadNo", leadNo);

const serial = "KRIS-" + String(leadNo).padStart(3, "0");
    /* =============================
       DATE & TIME
    ==============================*/
    const now = new Date();

    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });

    /* =============================
       WHATSAPP MESSAGE FORMAT
    ==============================*/
    const text = encodeURIComponent(
`━━━━━━━━━━━━━━━━
        NEW CLIENT LEAD
━━━━━━━━━━━━━━━━

Lead No     : ${serial}
Client Name : ${name}
Mobile No   : ${phone}
Location    : ${location}
Service     : ${service}

Message     : ${message}

━━━━━━━━━━━━━━━━
Source : Website
Date   : ${date}
Time   : ${time}
━━━━━━━━━━━━━━━━
KRISBUILD DESIGN & CONSTRUCTION`
    );

    const url = `https://wa.me/${yourNumber}?text=${text}`;

    /* =============================
       SEND DATA TO GOOGLE SHEET
    ==============================*/
fetch("https://script.google.com/macros/s/AKfycbxyA9fpqgGCBqDGhtdHo9Hj6AzdEvxjpmowEXnJLWo44uvopm_BTv_ev5K-oq-4CBew/exec", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    lead: serial,
    name: name,
    phone: phone,
    location: location,
    service: service,
    message: message,
    date: date,
    time
  })
})
.then(() => {

  console.log("✅ Data Sent to Google Sheet");

  alert("Form submitted successfully!");

})
.catch(error => {

  console.error("❌ Sheet Error:", error);

  alert("Error saving data. Please try again.");

});
    /* =============================
       OPEN WHATSAPP
    ==============================*/
    
    window.open(url, "_blank");

    /* =============================
       SUCCESS MESSAGE
    ==============================*/
    successMsg.style.display = "flex";

    form.reset();

    setTimeout(() => {
      successMsg.style.display = "none";
    }, 20000);

  });

});
/* ================================================ */
/* ================ slide  section JS ============= */
/* ================================================ */
document.addEventListener("DOMContentLoaded", function () {

  const slidesContainer = document.querySelector(".slides");
  const nextBtn = document.querySelector(".slider-next");
 const prevBtn = document.querySelector(".slider-prev");
  const titleEl = document.getElementById("image-title");
  const locationEl = document.getElementById("image-location");

  if (!slidesContainer) return;

  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  function getVisibleSlides() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  let visibleSlides = getVisibleSlides();
  let index = visibleSlides;

  // Clone for infinite
  slides.forEach((slide, i) => {
    if (i < visibleSlides) {
      slidesContainer.appendChild(slide.cloneNode(true));
    }
    if (i >= slides.length - visibleSlides) {
      slidesContainer.insertBefore(
        slide.cloneNode(true),
        slidesContainer.firstChild
      );
    }
  });

  slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function updateSlider(animate = true) {
    slidesContainer.style.transition = animate
      ? "transform 0.5s ease"
      : "none";

    const slideWidth = slides[0].offsetWidth;

    slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;

    let centerIndex = index + Math.floor(visibleSlides / 2);

    slides.forEach(slide => slide.classList.remove("active"));

    if (slides[centerIndex]) {
      slides[centerIndex].classList.add("active");

      if (titleEl) {
        titleEl.textContent = slides[centerIndex].dataset.title || "";
      }

      if (locationEl) {
        locationEl.textContent = slides[centerIndex].dataset.location || "";
      }
    }
  }

  updateSlider(false);

  nextBtn?.addEventListener("click", () => {
    index++;
    updateSlider();
  });

  prevBtn?.addEventListener("click", () => {
    index--;
    updateSlider();
  });

  slidesContainer.addEventListener("transitionend", () => {
    if (index >= totalSlides - visibleSlides) {
      index = visibleSlides;
      updateSlider(false);
    }

    if (index < visibleSlides) {
      index = totalSlides - (visibleSlides * 2);
      updateSlider(false);
    }
  });

  let autoPlay = setInterval(() => {
    index++;
    updateSlider();
  }, 3000);

  slidesContainer.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

  slidesContainer.addEventListener("mouseleave", () => {
    autoPlay = setInterval(() => {
      index++;
      updateSlider();
    }, 3000);
  });

  window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    updateSlider(false);
  });

});

/* ========================================================= */
/* ================== FAQ CLICK FUNCTION JS ================ */ 
/* ========================================================== */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});


/* ======================================================================= */
/* ====================== stats section SECTION JS ======================= */
/* ======================================================================= */ 
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace("+","");

    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment) + "+";
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
});
//  Step Working Process - Click to Show Detail Box
const steps = document.querySelectorAll(".step");

steps.forEach(step => {
  step.addEventListener("click", () => {

    if (step.classList.contains("active")) {
      step.classList.remove("active");
    } else {
      steps.forEach(s => s.classList.remove("active"));
      step.classList.add("active");
    }

  });
});


/* ======================================================================= */
/* ====================== home imsge slide SECTION JS ======================= */
/* ======================================================================= */ 
document.addEventListener("DOMContentLoaded", function () {

  const sliderImage = document.getElementById("sliderImage");
  const nextBtn = document.getElementById("nextImg");
  const prevBtn = document.getElementById("prevImg");
  const dotsContainer = document.querySelector(".dots");

  // ❌ agar element nahi mila → kuch mat karo
  if (!sliderImage || !nextBtn || !prevBtn || !dotsContainer) return;

  const images = [
    "1bhk-interior.png",
    "1bhk-morden-house.png",
    "2bhk-interior.png",
    "1bhk-interior.png",
    "1bhk-morden-house.png",
    "2bhk-interior.png"
  ];

  let index = 0;

  // 🔵 DOT CREATE
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
    });
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    sliderImage.src = images[index];

    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // ▶ NEXT
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateSlider();
  });

  // ◀ PREV
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateSlider();
  });

  updateSlider();

});
/* ================================================ */
/* ================ SEARCH SECTION =============== */
/* ================================================ */
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const noResults = document.getElementById("no-results");

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".service-card, .inner-card, .project-box");

    let anyFound = false;

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();

      // Show/hide card
      if (query === "" || text.includes(query)) {
        card.style.display = "";
        anyFound = true;
      } else {
        card.style.display = "none";
      }

      // Highlight matching text
      highlightCardText(card, query);
    });

    // Show/hide "No results found"
    if (noResults) {
      noResults.style.display = anyFound || query === "" ? "none" : "block";
    }
  });
});

// Highlight function
function highlightCardText(card, query) {
  if (!query) {
    // Reset all highlights
    const highlighted = card.querySelectorAll(".highlight");
    highlighted.forEach(span => {
      span.outerHTML = span.innerText;
    });
    return;
  }

  // Select all text containers
  const tags = card.querySelectorAll("p, h1, h2, h3, h4, span ,li");

  tags.forEach(tag => {
    // Remove previous highlights
    if (tag.dataset.originalText === undefined) {
      tag.dataset.originalText = tag.innerHTML;
    } else {
      tag.innerHTML = tag.dataset.originalText;
    }

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    tag.innerHTML = tag.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
  });
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}