const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#song-title-content').value.trim();
    const artist = document.querySelector('#artist-content').value.trim();
    const content = document.querySelector('#review-content').value.trim();
    const rating = document.querySelector('#rating-content').value.trim();
  
    if (title && artist && content && rating) {
      const response = await fetch(`/songs/`, {
        method: 'POST',
        body: JSON.stringify({ title, artist }),
        headers: {
            'Content-Type': 'application/json',
        },
      });

      const response2 = await fetch(`/reviews/`, {
        method: 'POST',
        body: JSON.stringify({ title, content, rating }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok && response2.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create review');
      }
    }
  };

document
.querySelector('.new-review-form')
.addEventListener('submit', newFormHandler);