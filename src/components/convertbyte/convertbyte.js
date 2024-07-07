


export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 بایت';
    const c = decimals < 0 ? 0 : decimals;
    let result = bytes;
    for (let i = 0; result >= 1024 && i < 8; i++) result /= 1024;
    // check if result is integer or not
    if (result % 1 === 0) {
      return result;
    }
    const resultStr = result.toString();
    return parseFloat(resultStr.slice(0, resultStr.indexOf('.') + (c + 1)));
  };


  
  export const formatBytesName = (bytes) => {
    if (bytes === 0) return '0 بایت';
    let i;
    let result = bytes;
    for (i = 0; result >= 1024 && i < 8; i++) result /= 1024;
    return ['بایت', 'کیلوبایت', 'مگ', 'گیگ', 'ترا', 'PB', 'EB', 'ZB', 'YB'][i];
  };

