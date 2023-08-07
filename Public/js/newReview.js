const newReviewHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#review-content').value.trim();
    const rating = document.querySelector('#rating').value.trim();
    const review_title = document.querySelector('#review-title-content').value.trim();
  
    if (content && rating && review_title) {

      const response = await fetch(`/reviews/`, {
        method: 'POST',
        body: JSON.stringify({ review_title, content, rating }),
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

const newSongHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#song-title-content').value.trim();
    const artist = document.querySelector('#artist-content').value.trim();

    if (title && artist) {
      console.log(title, artist);
      const response = await fetch(`/songs/`, {
        method: 'POST',
        body: JSON.stringify({ title, artist }),
        headers: {
            'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Song created! Please create a review for this song.');
      } else {
        alert('Failed to create review');
      }
    }
  };

document
.querySelector('.new-song-form')
.addEventListener('submit', newSongHandler);

document
.querySelector('.new-review-form')
.addEventListener('submit', newReviewHandler);