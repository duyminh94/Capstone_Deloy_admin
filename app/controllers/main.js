function dom(selector) {
  return document.querySelector(selector);
}
//================================================================================
let products = [];
GetProducts();
let currentFormat = new Intl.NumberFormat("vn-VN");
//========================================================================

function GetProducts(searchTerm) {
  apiGetProduct(searchTerm)
    .then((response) => {
      console.log(response.data);
      products = response.data.map((product) => {
        return new Procduct(
          product.id,
          product.name,
          product.price,
          product.screen,
          product.blackCamera,
          product.frontCamera,
          product.img,
          product.desc,
          product.type
        );
      });
      display(products);
    })
    .catch((error) => {
      console.log(error);
    });
}

function AddProcduct(product) {
  apiAddProduct(product)
    .then(() => {
      GetProducts();
      let isValid = ValidationForm();
      if (!isValid) {
        return;
      }
      ResetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteProduct(productId) {
  apideteleProduct(productId)
    .then(() => {
      GetProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(productId, product) {
  apiUpdateProduct(productId, product)
    .then(() => {
      GetProducts();
      let isValid = ValidationForm("edit");
      if (!isValid) {
        return;
      }
      ResetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

//=========================================================================
/* Hiển Thị Thông Tin */
function display(products) {
  let output = products.reduce((result, product, index) => {
    return (
      result +
      `<tr>
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${currentFormat.format(product.price)}</td>
      <td>${product.screen}</td>
      <td>${product.blackCamera}</td>
      <td>${product.frontCamera}</td>
      <td><img src="${product.img}" width="50px" height="50px" /></td>
      <td>${product.desc}</td>
      <td>${product.type}</td>
      <td><button class='btn btn-primary'
      data-toggle='modal'
      data-target='#myModal'
      data-id='${product.id}'
      data-type='edit'>Sửa</button>
     <button class="btn btn-danger"
      data-id='${product.id}'
      data-type='delete'> Xóa
      </button></td>
      
      </tr>`
    );
  }, "");
  dom("#tblDanhSachSanPham").innerHTML = output;
}

function ResetForm() {
  dom("#ThongTinSP").value = "";
  dom("#tenSP").value = "";
  dom("#donGia").value = "";
  dom("#manHinh").value = "";
  dom("#cameraT").value = "";
  dom("#cameraS").value = "";
  dom("#HinhAnh").value = "";
  dom("#moTa").value = "";
  dom("#loaiSP").value = "";

  dom("#tenSP").disabled = false;
}

//================================================================================

/*  Add - Thêm sản phẩm */
dom("#btnthemSP").addEventListener("click", () => {
  dom(".modal-title").innerHTML = "Thêm Sản Phẩm";
  dom(".modal-footer").innerHTML = `
    <button class='btn btn-secondary' data-dismiss='modal'>Hủy</button>
    <button class='btn btn-primary' data-type='add'>Thêm</button>
    `;
  ResetForm();
});

dom(".modal-footer").addEventListener("click", (evt) => {
  console.log(evt.target);
  let Eltype = evt.target.getAttribute("data-type");

  let id = dom("#ThongTinSP").value;
  let name = dom("#tenSP").value;
  let price = +dom("#donGia").value;
  let screen = dom("#manHinh").value;
  let blackCamera = dom("#cameraT").value;
  let frontCamera = dom("#cameraS").value;
  let img = dom("#HinhAnh").value;
  let desc = dom("#moTa").value;
  let type = dom("#loaiSP").value;

  let product = new Procduct(
    null,
    name,
    price,
    screen,
    blackCamera,
    frontCamera,
    img,
    desc,
    type
  );

  if (Eltype === "add") {
    AddProcduct(product);
  } else if (Eltype === "update") {
    updateProduct(id, product);
  }
});

/* Xoá và Cập nhật */

dom("#tblDanhSachSanPham").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let elType = evt.target.getAttribute("data-type");

  if (elType === "delete") {
    deleteProduct(id);
  } else if (elType === "edit") {
    dom(".modal-title").innerHTML = "Cập Nhật Mới Sản Phẩm ";
    dom(".modal-footer").innerHTML = `
      <button class='btn btn-secondary' data-dismiss='modal'>Hủy</button>
      <button class='btn btn-primary' data-type='update'>Cập Nhật</button>
      `;
    ResetForm();

    apiGetProductById(id)
      .then((response) => {
        let product = response.data;
        dom("#ThongTinSP").value = product.id;
        dom("#tenSP").value = product.name;
        dom("#donGia").value = product.price;
        dom("#manHinh").value = product.screen;
        dom("#cameraT").value = product.blackCamera;
        dom("#cameraS").value = product.frontCamera;
        dom("#HinhAnh").value = product.img;
        dom("#moTa").value = product.desc;
        dom("#loaiSP").value = product.type;
      })
      .catch((error) => {
        console.log(error);
      });
    dom("#tenSP").disabled = true;
  }
});

dom("#search").addEventListener("keydown", (evt) => {
  console.log(evt.target);
  // Kiểm tra không phải ký tự Enter => Kết thúc hàm
  if (evt.key !== "Enter") return;
  GetProducts(evt.target.value);
});

//================================================================
/* Validation */

function ValidationForm(typeproduct) {
  let isValid = true;
  if (typeproduct === "edit") {
    isValid =
      validaPrice() &
      validaSrceen() &
      validaBlackCamera() &
      validaFrontCamera() &
      validaImage() &
      validaType() &
      validadesc();
  } else {
    isValid =
      validationName() &
      validaPrice() &
      validaSrceen() &
      validaBlackCamera() &
      validaFrontCamera() &
      validaImage() &
      validaType() &
      validadesc();
  }
  if (!isValid) {
    return false;
  }
  return true;
}
