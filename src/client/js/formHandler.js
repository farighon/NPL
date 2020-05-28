async function handleSubmit(event) {
    event.preventDefault();
    const data = {};
    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    const checkURL = Client.validateURL(formText);
    if (checkURL) {
      data.text = formText;
      console.log("::: Form Submitted :::");
      postData('http://localhost:8082/addSentimentData', data)
      updateUI();
    } else {
      document.getElementById('results').textContent = 'Unfortunately, the URL was entered in \
          incorrectly. Please enter in the correct URL link.';
    }
}

// POST
const postData = async (url='', data={}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
}

const updateUI = async () => {
  const request = await fetch('http://localhost:8082/all');
  try {
    const allData = await request.json();
    console.log(allData, '-- allData in updateUI')
    document.getElementById('results').innerHTML =
      `<div id="input-url">
        <span><strong>The article Aylien is analyzing for us</strong>: ${allData.text}</span>
      </div>
      <div id="language">
        <span><strong>The language is in</strong>: ${allData.language}</span>
      </div>
      <div id="categories">
        <span id="categories__label"><strong>Label of the article</strong>: ${allData.categories[0].label}</span><br><br>
        <span id="categories__confidence"><strong>Confidence of the analysis</strong>: ${allData.categories[0].confidence}</span>
      </div>`;

  } catch (error) {
    console.log(error);
  }
}

export { handleSubmit }
