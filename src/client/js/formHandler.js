async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    console.log("::: Form Submitted :::");

    //postData('/sentiment', {userText: formText})

    const message = await fetch('http://localhost:8082/sentiment')
      .then((res) => {
        console.log(res, '-- res in fetch')
        return res.json();
      })
      .then(function(data) {
        console.log(data, '-- data in the fetch')
      })
}

// POST
const postData = async (url='', data={}) => {
  console.log(data, '-- data in Post')
  return data;
}

export { handleSubmit }
