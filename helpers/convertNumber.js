const convertNumber = (number) => {
    return number.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })
}

module.exports = convertNumber 