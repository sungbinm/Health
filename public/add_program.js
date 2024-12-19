document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const muscleActivationArea = document.getElementById('muscleActivationArea');
  

  // Fetch user programs and calculate muscle activation
  async function fetchMuscleActivation() {
    try {
      const response = await fetch('/api/getMuscleActivation', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const muscleActivationData = await response.json();

      const userPrograms = await fetchPrograms();
      const muscleActivation = calculateMuscleActivation(userPrograms, exerciseMapping);
      displayMuscleActivation(muscleActivation);
    } catch (error) {
      console.error('Error fetching muscle activation:', error);
    }
  }

  // Fetch the user's workout programs from the server
  async function fetchPrograms() {
    try {
      const response = await fetch('/get-programs');
      if (response.ok) {
        const programs = await response.json();
        return programs;
      } else {
        console.error('Failed to fetch programs');
        return [];
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  // Calculate the total muscle activation based on the exercises in the user's programs
  function calculateMuscleActivation(programs, exerciseMapping) {
    let muscleActivation = {
      chest: 0,
      back: 0,
      frontShoulder: 0,
      sideShoulder: 0,
      rearShoulder: 0,
      biceps: 0,
      triceps: 0,
      abs: 0,
      quads: 0,
      glutes: 0,
      hamstrings: 0,
      calf: 0,
    };

    programs.forEach((program) => {
      const exerciseInfo = exerciseMapping[program.exercise];
      if (exerciseInfo) {
        for (let muscle in exerciseInfo) {
          muscleActivation[muscle] += exerciseInfo[muscle];
        }
      }
    });

    return muscleActivation;
  }

  // Display the calculated muscle activation in the UI
  function displayMuscleActivation(muscleActivation) {
    // Clear previous muscle activation data
    muscleActivationArea.innerHTML = '';

    for (const muscle in muscleActivation) {
      const muscleDiv = document.createElement('div');
      muscleDiv.classList.add('frame-5');
      muscleDiv.innerHTML = `
        <div class="text-wrapper-4">${muscle}</div>
        <div class="text-wrapper-4">${muscleActivation[muscle]}</div>
        <div class="text-wrapper-4">${muscle}</div>
      `;
      muscleActivationArea.appendChild(muscleDiv);
    }
  }

  // Handle login button click
  loginButton.addEventListener('click', () => {
    goToLogin();
  });

  // Handle logout button click
  logoutButton.addEventListener('click', async () => {
    await logout();
    window.location.reload();
  });

  // Handle logout action
  async function logout() {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.message === '로그아웃 성공') {
        usernameDisplay.textContent = '';
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Go to login page
  function goToLogin() {
    window.location.href = '/login';
  }

  // Check if user is logged in and update UI accordingly
  async function checkLoginStatus() {
    try {
      const response = await fetch('/check-session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        usernameDisplay.textContent = `Welcome, ${data.username}`;
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
      } else {
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  // Call checkLoginStatus on page load
  checkLoginStatus();

  // Add event listener for the "Update" button
  const updateButton = document.querySelector('button[type="button"]');
  updateButton.addEventListener('click', fetchMuscleActivation);
});