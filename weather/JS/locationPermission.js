const  checkLocationPermission=() =>{
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') {
          window.location.href = '../index.html';
          alert("location access granted")
          
         
        } else if (result.state === 'prompt') {
          document.getElementById('status').textContent = 'Location access is not decided yet.';
        } else if (result.state === 'denied') {
          document.getElementById('status').textContent = 'Location access is denied. To enable location access, go to your browser settings and allow location sharing for this site.';
        }
        // Listen for changes in the permission state
        result.onchange = () => {
          checkLocationPermission();
        };
      });
    } else {
      document.getElementById('status').textContent = 'Geolocation is not supported in this browser.';
    }
  }

  
  // Call the function to check location permission status
  checkLocationPermission();