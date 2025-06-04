  import axios from'../../components/axios/axios.customize'
  export async function getCart(email) {
    try {
      
      const data = await axios.get(`/api/cart?email=${email}`);
       const listItem=data.items;

        return listItem;
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
    }
  }
 export async function updateCart(email,updateData) {
    try {
      
      const data = await axios.put(`/api/cart/update`,{email,item:updateData});
        console.log(data);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
      throw err
    }
  }
  export async function removeItemCart(email,id) {
    try {
      
      const data = await axios.put(`/api/cart`,{email,id});
        console.log(data);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
      throw err
    }
  }
  
