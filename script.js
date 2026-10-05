// ============ mobile nav toggle ============
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ testimonial carousel ============
const testimonials = document.querySelectorAll('#testimonial-track .testimonial');
const dots = document.querySelectorAll('#testimonial-dots .dot');
let activeIndex = 0;
let autoplayTimer;

function showTestimonial(index) {
  testimonials.forEach((t, i) => t.classList.toggle('is-active', i === index));
  dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  activeIndex = index;
}

function nextTestimonial() {
  showTestimonial((activeIndex + 1) % testimonials.length);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(nextTestimonial, 6000);
}

function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
}

if (testimonials.length) {
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showTestimonial(i);
      startAutoplay();
    });
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) startAutoplay();
}


// ============ follower package swipe rail ============
const followerRail = document.getElementById('followers-rail');

if (followerRail) {
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;

  followerRail.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    isDragging = true;
    startX = event.clientX;
    startScroll = followerRail.scrollLeft;
    followerRail.setPointerCapture?.(event.pointerId);
  });

  followerRail.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    followerRail.scrollLeft = startScroll - (event.clientX - startX);
  });

  const stopDragging = () => { isDragging = false; };
  followerRail.addEventListener('pointerup', stopDragging);
  followerRail.addEventListener('pointercancel', stopDragging);
  followerRail.addEventListener('pointerleave', stopDragging);
}

// Keep package buttons functional without forcing a payment provider.
document.querySelectorAll('.follower-card__btn').forEach((button) => {
  button.addEventListener('click', () => {
    const followers = Number(button.dataset.followers).toLocaleString('en-IN');
    const price = Number(button.dataset.price).toLocaleString('en-IN');
    alert(`You selected ${followers} followers for ₹${price}.`);
  });
});

// Like package swipe rail
const likesRail=document.getElementById("likes-rail");if(likesRail){let d=false,x=0,s=0;likesRail.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;d=true;x=e.clientX;s=likesRail.scrollLeft;likesRail.setPointerCapture?.(e.pointerId)});likesRail.addEventListener("pointermove",e=>{if(d)likesRail.scrollLeft=s-(e.clientX-x)});["pointerup","pointercancel","pointerleave"].forEach(e=>likesRail.addEventListener(e,()=>d=false))}document.querySelectorAll(".like-card__btn").forEach(b=>b.addEventListener("click",()=>alert(`You selected ${Number(b.dataset.likes).toLocaleString("en-IN")} likes for ₹${Number(b.dataset.price).toLocaleString("en-IN")}.`)));
