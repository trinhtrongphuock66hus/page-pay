// Lấy tham chiếu đến phần tử nút SignIn
const signInButton = document.querySelector(".signIn button");

// Gán sự kiện cho nút SignIn
signInButton.addEventListener("click", function() {
  // Lấy thông tin tài khoản và mật khẩu từ các trường nhập liệu
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  // Kiểm tra tính hợp lệ của tên đăng nhập và mật khẩu
  console.log(`Name: `,name,`Address: `,address,`Phonenumber: `, phone);
  
  // khởi tạo đối tượng XMLHttpRequest
  var newaddress = {
    name: name,
    address: address,
    phonenumber: phone
  };

  // Gửi yêu cầu HTTP POST1 đến địa chỉ '/users'
  var xhttp2 = new XMLHttpRequest();
  xhttp2.open("POST", "http://localhost:3005/users", true);
  xhttp2.setRequestHeader("Content-type", "application/json");

  // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
  var data = JSON.stringify(newaddress);
  xhttp2.send(data);

  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Xử lý kết quả trả về từ máy chủ
      var data = JSON.parse(this.responseText);
      alert(data.message);
    }
  };
});