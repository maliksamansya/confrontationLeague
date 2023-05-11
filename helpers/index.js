const formatCurrency = (salary) => {
    return salary.toLocaleString('id-ID',{
        style:'currency',
        currency:'IDR'
    })
}

module.exports = { formatCurrency }