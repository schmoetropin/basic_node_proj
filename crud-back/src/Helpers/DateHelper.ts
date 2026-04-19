const getDate = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();

    let m = dateObj.getMonth() + 1;
    let month = m > 9 ? m : `0${m}`;

    let d = dateObj.getDate();
    let day = d > 9 ? d : `0${d}`;

    let h = dateObj.getHours();
    let hour = h > 9 ? h : `0${h}`;

    let i = dateObj.getMinutes();
    let minute = i > 9 ? i : `0${i}`;

    let s = dateObj.getSeconds();
    let second = s > 9 ? s : `0${s}`;

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export { getDate }