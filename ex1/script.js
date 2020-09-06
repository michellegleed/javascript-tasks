number = document.querySelector('#number')

change = (int) => {
    current = parseInt(number.innerHTML)
    console.log(current)
    number.innerHTML = current += int
}