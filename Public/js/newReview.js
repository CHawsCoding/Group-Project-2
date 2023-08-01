const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#song-title-content').value.trim();
    const artist = document.querySelector('#artist-content').value.trim();
    const content = document.querySelector('#review-content').value.trim();
  
    if (songTitle && artist && content) {
      const response = await fetch(`/api/review/`, {
        method: 'POST',
        body: JSON.stringify({ songTitle, artist, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create review');
      }
    }
  };

document
.querySelector('.new-review-form')
.addEventListener('submit', newFormHandler);