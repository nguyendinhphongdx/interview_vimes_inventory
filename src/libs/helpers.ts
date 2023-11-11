function getRandomElements<T>(array: Array<T>): Array<T> {
    // Tính số lượng phần tử cần lấy ngẫu nhiên (từ 1 đến length - 1)
    const count = Math.floor(Math.random() * (array.length - 1)) + 1;

    // Lấy mảng con ngẫu nhiên từ mảng gốc
    const randomElements = array.slice().sort(() => 0.5 - Math.random()).slice(0, count);

    return randomElements;
}

function getRandomElement<T>(array: Array<T>): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
export {
    getRandomElements,
    getRandomElement
}
