const dateFormater = (isoTimeString) => {
    const isoDate = new Date(isoTimeString);

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = isoDate.toLocaleDateString('en-US', options);
    return formattedDate;
}

export default dateFormater