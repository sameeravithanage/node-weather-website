const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



// here param e represents event
weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecast
        })
    })
})