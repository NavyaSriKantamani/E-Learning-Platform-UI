
function logout() {
    localStorage.clear();
    location.reload();
}

function showSection(id) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.style.display = 'none');
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        document.getElementById('page-title').textContent =
            target.getAttribute('data-title') || 'TechTrek';
    }
}

function login() {
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const errorBox = document.getElementById('login-error');
  
    if (!name || !email || !role) {
      errorBox.textContent = "Please fill out your details to continue!";
      errorBox.style.display = "block";
      return;
    }
  
    errorBox.style.display = "none";
  
    // Store user details
    localStorage.setItem('techTrekUser', name);
    localStorage.setItem('techTrekEmail', email);
    localStorage.setItem('techTrekRole', role);
  
    // Display user name
    document.getElementById('userDisplay').textContent = name;
    document.getElementById('user-name').textContent = name;
  
    // Hide login screen and show main app
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  
    // Enable scrolling for the main app
    document.body.style.overflow = 'auto';
  
    // Show the dashboard section
    showSection('dashboard');
    document.getElementById('page-title').textContent = 'Dashboard';
  }
  
  window.onload = () => {
    // Show login screen and hide main app initially
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  
    // Disable scrolling when showing the login screen
    document.body.style.overflow = 'hidden';
  };
  function enrollCourse(button) {
    const courseCard = button.closest('.course-card');
    const courseTitle = courseCard.querySelector('h3').textContent;
    const courseDescription = courseCard.querySelector('p').textContent;
    const courseBadge = courseCard.querySelector('.badge').className;
  
    // Check if the course is already enrolled (button text is already "Registered")
    if (button.textContent === "Registered") return;
  
    // Change button text to "Registered"
    button.style.display = 'none'; // Hide the button
    const registeredText = document.createElement('span');
    registeredText.textContent = "Registered";
    registeredText.classList.add('registered-text'); // Add class for green text and right alignment
    courseCard.appendChild(registeredText); // Append "Registered" text to the course card
  
    // Create a new card for Ongoing Classes with same style as courses
    const ongoingCourse = document.createElement('div');
    ongoingCourse.classList.add('course-card', 'ongoing'); // Applying same class as in courses section
  
    const startDate = new Date(); // Assuming course starts tomorrow
    const startDateStr = startDate.toLocaleDateString(); // Format the date
    const timings = "9:00 AM - 11:00 AM"; // Example timings
    const duration = "2 hours"; // Example duration
  
    ongoingCourse.innerHTML = `
      <h3>${courseTitle}</h3>
      <p>${courseDescription}</p>
      <span class="badge ${courseBadge}">Registered</span>
      <p><strong>Start Date:</strong> ${startDateStr}</p>
      <p><strong>Timings:</strong> ${timings}</p>
      <p><strong>Duration:</strong> ${duration}</p>
    `;
  
    // Add this course to the Ongoing Classes section
    document.getElementById('ongoing-courses-container').appendChild(ongoingCourse);
  }
  
  
  function unregisterCourse(button) {
    const courseCard = button.closest('.course-card');
    const courseTitle = courseCard.querySelector('h3').textContent;
  
    // Change button text back to "Enroll"
    const originalCard = document.querySelector(`.course-card h3:contains('${courseTitle}')`).parentElement;
    originalCard.querySelector('.enroll-btn').textContent = 'Enroll';
    
    // Remove from Ongoing Classes
    courseCard.remove();
  
    // Show the course card again in the Available Courses section
    originalCard.style.display = 'block';
  }
  // Countdown Timer Function
