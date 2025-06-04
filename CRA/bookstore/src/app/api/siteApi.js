import axios from '../../components/axios/axios.customize'
const API_BASE_URL = ''; // hoặc để trống nếu dùng proxy trong CRA
export async function getBookList() {
  try {
    const response = await fetch(`/api/books`);
    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json(); // Sử dụng response.json() thay vì text()
    data.sort((a,b)=> new Date(b.createAt) - new Date(a.createAt))
    return data;

  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err);
  }
}
  export async function removeBook(id) {
  try {
    const response = await axios.delete(`/api/books/${id}`);
      console.log(response)

  } catch (err) {
    console.error('Lỗi .....:', err);
  }
}
