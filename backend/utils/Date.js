const getCurrentDateTime = () => {
    const dateformate = new Date();
    const date = dateformate.getDate();
    const month = dateformate.getMonth()+1;
    const year = dateformate.getFullYear();
    const hours = dateformate.getHours();
    const minutes = dateformate.getMinutes();
    const seconds = dateformate.getSeconds();
    const Today =`${date}-${month}-${year} ${hours}:${minutes}:${seconds}`

    return Today; 
};

module.exports = getCurrentDateTime;
