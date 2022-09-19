function validationName() {
  let name = dom("#tenSP").value;
  let spanEl = dom("#tbtenSP");

  if (!name) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Tên Sản Phẩm Không Được Để Trống";
    return false;
  }
  if (name.lenght < 5) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Tên Sản Phẩm Phải Nhập Từ 4 Ký tự trở lên";
    return false;
  }
  if (!validaCheckSP(name)) {
    return false;
  }

  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validaCheckSP(name) {
  let spanEl = dom("#tbtenSP");
  let findId = products.find((product) => {
    return product.name == name;
  });
  if (findId) { 
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Sản phẩm đã tồn tại";
    return false;
  }
  return true;
}

function validaPrice() {
  let price = +dom("#donGia").value;
  let spanEl = dom("#tbdonGia");

  if (!price) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Giá Sản Phẩm Không Được Để Trống";
    return false;
  }
  if (!isNumber(price) || price < 5000000 || price > 40000000) {
    spanEl.style.display = "Block";
    spanEl.innerHTML =
      "Giá Sản Phẩm Khi Lên Sàn Không được nhỏ hơn 5.000.000 hoặc vượt mức 40.000.000";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validaSrceen() {
  let screen = dom("#manHinh").value;
  let spanEl = dom("#tbmanHinh");

  if (!screen) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Màn Hình Điện Thoại Không Được Để Trống";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validaBlackCamera() {
  let blackCamera = dom("#cameraT").value;
  let spanEl = dom("#tbcameraT");

  if (!blackCamera) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = " Vui lòng nhập thông tin camera trước";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validaFrontCamera() {
  let frontCamera = dom("#cameraS").value;
  let spanEl = dom("#tbcamerS");

  if (!frontCamera) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = " Vui lòng nhập thông tin camera trước";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validaImage() {
  let img = dom("#HinhAnh").value;
  let spanEl = dom("#tbHinhAnh");

  if (!img) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = " Hình Ảnh sản phẩm không được để trống";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validaType() {
  let type = dom("#loaiSP").value;
  let spanEl = dom("#tbloaiSP");

  if (!type) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Chọn loại sản phẩm";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

function validadesc() {
  let desc = dom("#moTa").value;
  let spanEl = dom("#tbmoTa");

  if (!desc) {
    spanEl.style.display = "Block";
    spanEl.innerHTML = "Mô tả vui không được để trống";
    return false;
  }

  if (desc.lenght < 60) {
    spanEl.style.display = "block";
    spanEl.innerHTML = "Mô Tả Sản Phẩm Không Quá 60 Ký";
    return false;
  }
  spanEl.style.display = "none";
  spanEl.innerHTML = "";
  return true;
}

//============================================================================
function isNumber(value) {
  return !isNaN(parseFloat(value)) && !isNaN(value - 0);
}

function dom(selector) {
  return document.querySelector(selector);
}
