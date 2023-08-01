const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#song-title-content').value.trim();
    const artist = document.querySelector('#artist-content').value.trim();
    const content = document.querySelector('#review-content').value.trim();
  
    if (title && artist && content) {
      const response = await fetch(`/reviews/`, {
        method: 'POST',
        body: JSON.stringify({ title, artist, content }),
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