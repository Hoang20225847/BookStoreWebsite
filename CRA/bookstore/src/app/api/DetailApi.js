const API_BASE_URL = ''; // hoặc để trống nếu dùng proxy trong CRA

export async function getBookDetail(a) {
  try {
    const response = await fetch(`/api/books`);
    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json(); // Sử dụng response.json() thay vì text()
    const found = data.find(book => book.name === a);
    return found;
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err);
  }
}
