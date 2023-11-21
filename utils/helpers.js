module.exports = {
  format_time: (date) => {
    const d = new Date(date)
    let day = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    return (`${day} at ${time}`);
  },
}