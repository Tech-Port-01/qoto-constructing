// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('contactForm');
//     const successMessage = document.getElementById('successMessage');
    
//     form.addEventListener('submit', async function(event) {
//         event.preventDefault();
        
//         // Show loading state on button
//         const submitButton = form.querySelector('button[type="submit"]');
//         const originalButtonText = submitButton.textContent;
//         submitButton.disabled = true;
//         submitButton.textContent = 'Sending...';
        
//         try {
//             // Get form data
//             const formData = new FormData(form);
//             const formObject = Object.fromEntries(formData.entries());
            
//             // Send data to our own API endpoint
//             const response = await fetch('/api/submit', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formObject)
//             });
            
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
            
//             // Hide form and show success message
//             form.reset();
//             form.classList.add('hidden');
//             successMessage.classList.remove('hidden');
            
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Sorry, there was an error submitting your form. Please try again.');
//         } finally {
//             // Restore button state
//             submitButton.disabled = false;
//             submitButton.textContent = originalButtonText;
//         }
//     });
// });


// //   styles
// // Mobile Navigation
//         const hamburger = document.getElementById('hamburger');
//         const navMenu = document.getElementById('nav-menu');
        
//         hamburger.addEventListener('click', () => {
//             navMenu.classList.toggle('active');
//             hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
//         });
        
//         // Close mobile menu when clicking a link
//         document.querySelectorAll('.nav-link').forEach(link => {
//             link.addEventListener('click', () => {
//                 navMenu.classList.remove('active');
//                 hamburger.innerHTML = '☰';
//             });
//         });
        
//         // Sticky Header
//         window.addEventListener('scroll', () => {
//             const header = document.getElementById('header');
//             header.classList.toggle('scrolled', window.scrollY > 50);
//         });
        
//         // Back to Top Button
//         const backToTop = document.getElementById('backToTop');
        
//         window.addEventListener('scroll', () => {
//             backToTop.classList.toggle('active', window.scrollY > 300);
//         });
        
//         backToTop.addEventListener('click', () => {
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//         });
        
//         // Testimonial Slider
//         const testimonialSlides = document.querySelectorAll('.testimonial-slide');
//         const testimonialDots = document.querySelectorAll('.testimonial-dot');
//         let currentSlide = 0;
        
//         function showSlide(index) {
//             testimonialSlides.forEach(slide => slide.classList.remove('active'));
//             testimonialDots.forEach(dot => dot.classList.remove('active'));
            
//             testimonialSlides[index].classList.add('active');
//             testimonialDots[index].classList.add('active');
//             currentSlide = index;
//         }
        
//         testimonialDots.forEach((dot, index) => {
//             dot.addEventListener('click', () => showSlide(index));
//         });
        
//         // Auto slide change
//         setInterval(() => {
//             currentSlide = (currentSlide + 1) % testimonialSlides.length;
//             showSlide(currentSlide);
//         }, 5000);
        
//         // Smooth scrolling for anchor links
//         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//                 e.preventDefault();
                
//                 const targetId = this.getAttribute('href');
//                 const targetElement = document.querySelector(targetId);
                
//                 if (targetElement) {
//                     window.scrollTo({
//                         top: targetElement.offsetTop - 70,
//                         behavior: 'smooth'
//                     });
//                 }
//             });
//         });



document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  if (!form) {
    console.error('Contact form not found in the document');
    return;
  }
  
  if (!successMessage) {
    console.warn('Success message element not found. It will be created dynamically.');
  }
  
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Show loading state on button
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // Get form data
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
      
      // Send data to our own API endpoint
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      // Handle success
      form.reset();
      
      // If success message element exists, show it; otherwise create it
      if (successMessage) {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
      } else {
        // Create a success message dynamically
        const successDiv = document.createElement('div');
        successDiv.id = 'successMessage';
        successDiv.className = 'success-message';
        successDiv.innerHTML = '<h3>Thank you!</h3><p>Your message has been sent successfully.</p>';
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        form.style.display = 'none';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error submitting your form: ' + error.message);
    } finally {
      // Restore button state
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});
