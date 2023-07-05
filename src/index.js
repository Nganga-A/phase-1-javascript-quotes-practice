
function getQuotes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
      .then(response => response.json())
      .then(quotes => {
        const quoteList = document.getElementById('quote-list');
  
        quotes.forEach(quote => {
          const li = createQuoteElement(quote);
          quoteList.appendChild(li);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Create a single quote element
  function createQuoteElement(quote) {
    const li = document.createElement('li');
    li.classList.add('quote-card');
  
    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('blockquote');
  
    const p = document.createElement('p');
    p.classList.add('mb-0');
    p.textContent = quote.quoteText;
  
    const footer = document.createElement('footer');
    footer.classList.add('blockquote-footer');
    footer.textContent = quote.author;
  
    const br = document.createElement('br');
  
    const likeButton = document.createElement('button');
    likeButton.classList.add('btn-success');
    likeButton.textContent = `Likes: ${quote.likes.length}`;
    likeButton.addEventListener('click', () => {
      createLike(quote.id);
    });
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteQuote(quote.id, li);
    });
  
    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    blockquote.appendChild(br);
    blockquote.appendChild(likeButton);
    blockquote.appendChild(deleteButton);
  
    li.appendChild(blockquote);
  
    return li;
  }
  
  // Create a new quote
  function createQuote(quoteText, author) {
    const data = {
      quoteText: quoteText,
      author: author
    };
  
    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(quote => {
        const quoteList = document.getElementById('quote-list');
        const li = createQuoteElement(quote);
        quoteList.appendChild(li);
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Delete a quote
  function deleteQuote(quoteId, li) {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE'
    })
      .then(() => {
        li.remove();
      })
      .catch(error => console.error('Error:', error));
  }
  
  // like for a quote
  function createLike(quoteId) {
    const data = {
      quoteId: quoteId
    };
  
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(like => {
        const likeButton = document.querySelector(`li[data-quote-id="${quoteId}"] button.btn-success`);
        const likeCount = likeButton.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Event listener for the form submission
  document.getElementById('new-quote-form').addEventListener('submit', event => {
    event.preventDefault();
    const quoteInput = document.getElementById('new-quote');
    const authorInput = document.getElementById('author');
  
    const quoteText = quoteInput.value;
    const author = authorInput.value;
  
    createQuote(quoteText, author);
  
    quoteInput.value = '';
    authorInput.value = '';
  });
  
  
  getQuotes();
  