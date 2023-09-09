/**
 * 时间戳转化为日期格式
 * @param {*} timestamp 
 * @returns 
 */
const filterDateFormat = (timestamp) => {
    // 使用 Date 构造函数将时间戳转换为 Date 对象
    const date = new Date(+timestamp);
    // 使用 Date 对象的方法来获取日期
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export {
    filterDateFormat
}