$(document).ready(function () {
  // Update The Entries Selection
  $("#DataNumber").val($("#DataNumber").attr("DataNumber"));

  GetAllPositions();
  GetAllDepartment();

  function GetAllPositions() {
    var rows = "";
    let formData = new FormData();
    formData.append("Type", "get_all_position");
    $.ajax({
      method: "POST",
      url: BASE_URL + "users/get_users_links",
      processData: false,
      contentType: false,
      data: formData,
      headers: { "X-CSRFToken": csrftoken },
      async: false,
      success: function (response) {
        rows = response.Message;
      },
      error: function (response) { },
    });

    var dataRow = "";
    if (rows.length > 0) {
      dataRow += `<option value=''>Select Positon</option>`;
      for (var i = 0; i < rows.length; i++) {
        dataRow +=
          `
                  <option value='` +
          rows[i].id +
          `'>` +
          rows[i].name +
          `</option>
                  `;
      }
      $("#Position").html(dataRow);
    }
  }
  function GetAllDepartment() {
    var rows = "";
    let formData = new FormData();
    formData.append("Type", "get_all_department");
    $.ajax({
      method: "POST",
      url: BASE_URL + "users/get_users_links",
      processData: false,
      contentType: false,
      data: formData,
      headers: { "X-CSRFToken": csrftoken },
      async: false,
      success: function (response) {
        rows = response.Message;
      },
      error: function (response) { },
    });

    var dataRow = "";
    if (rows.length > 0) {
      dataRow += `<option value=''>Select Department</option>`;
      for (var i = 0; i < rows.length; i++) {
        dataRow +=
          `
                  <option value='` +
          rows[i].id +
          `'>` +
          rows[i].name +
          `</option>
                  `;
      }
      $("#Department").html(dataRow);
    }
  }

  $("#DataNumber").change(function () {
    RefreshPage();
  });

  $("#SearchQuery").on("change", function () {
    RefreshPage();
  });

  $("#SearchQueryBTN").on("click", function () {
    RefreshPage();
  });

  $(".pagination .page-item").on("click", function () {
    const pageNumber = $(this).attr("page");
    $(".activePage").attr("activePage", pageNumber);
    RefreshPage();
  });

  function RefreshPage() {
    let page = $(".activePage").attr("activePage");
    let search = $("#SearchQuery").val();
    let entries = $("#DataNumber").val();

    window.location.replace(
      BASE_URL +
      `users/clients?DataNumber=${entries}&SearchQuery=${search}&page=${page}`
    );
  }

  $("#customer_table tbody").on("click", ".edit-client", function (e) {
    e.preventDefault();
   
    const id = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: BASE_URL + "users/manage_users/" + parseInt(id),
      headers: { "X-CSRFToken": csrftoken },
      async: true,
      success: function (response) {
        if (!response.isError) {
          $("#customerModal").modal("show");
          $("#customerID").val(response.Message.id);
          $("#FName").val(response.Message.first_name);
          $("#LName").val(response.Message.last_name);
          $("#Phone").val(response.Message.phone);
          $("#Email").val(response.Message.email);
          $("#Position").val(response.Message.position);
          $("#Department").val(response.Message.department);
          $("#Gender").val(response.Message.gender);
        } else {
          Swal.fire({
            title: "Something Wrong!!!!",
            text: response.Message,
            icon: "error",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !0,
          });
        }
      },
      error: function (response) { },
    });
  });

  $("#save_changes").on("click", function (e) {
    e.preventDefault();
    let formData = new FormData();
    let id = $("#customerID").val();
    let FName = $("#FName").val();
    let LName = $("#LName").val();
    let Phone = $("#Phone").val();
    let Email = $("#Email").val();
    let Position = $("#Position").val();
    let Department = $("#Department").val();
    let Gender = $("#Gender").val();
    formData.append("fname", FName);
    formData.append("lname", LName);
    formData.append("phone", Phone);
    formData.append("email", Email);
    formData.append("position", Position);
    formData.append("department", Department);
    formData.append("gender", Gender);
    if (FName == "") {
      Swal.fire("Error!!", "Please Enter first name", "error");
    } else if (LName == "") {
      Swal.fire("Error!!", "Please Enter last name", "error");
    } else if (Phone == "") {
      Swal.fire("Error!!", "Please Enter phone number", "error");
    } else if (Email == "") {
      Swal.fire("Error!!", "Please Enter email", "error");
    } else if (Position == "") {
      Swal.fire("Error!!", "Please Select position", "error");
    } else if (Department == "") {
      Swal.fire("Error!!", "Please Select department", "error");
    } else if (Gender == "") {
      Swal.fire("Error!!", "Please Select gender", "error");
    } else {
      $.ajax({
        method: "POST",
        url: BASE_URL + "users/manage_users/" + id,
        headers: { "X-CSRFToken": csrftoken },
        processData: false,
        contentType: false,
        data: formData,
        async: true,
        success: function (response) {
          $("#customerModal").modal("hide");
          if (!response.isError) {
            Swal.fire({
              title: "Successfully",
              text: response.Message,
              icon: "success",
              confirmButtonClass: "btn btn-primary w-xs mt-2",
              buttonsStyling: !1,
              showCloseButton: !0,
            }).then((e) => {
              e.value && location.reload();
            });
          } else {
            Swal.fire({
              title: "Something Wrong!!",
              text: response.Message,
              icon: "error",
              confirmButtonClass: "btn btn-primary w-xs mt-2",
              buttonsStyling: !1,
              showCloseButton: !0,
            });
          }
        },
        error: function (response) { },
      });
    }
  });



  $("#customer_table tbody").on("click", ".password-agent", function (e) {
    e.preventDefault();
    $(".change_password").modal("show");
    const id = $(this).attr("id");
    $('#change_user_password').attr("userID", id);
    $('#password').val('')
    $('#confirm_password').val('')
  });

  $('#change_user_password').on('click', function (e) {
    const id = $(this).attr("userID");
    let formData = new FormData();

    formData.append('user', id)
    formData.append('type', 'ChangePassword')
    formData.append('password', $('#password').val())
    formData.append('confirm', $('#confirm_password').val())
    $.ajax({
      method: "POST",
      url: BASE_URL + "users/change_password",
      headers: { "X-CSRFToken": csrftoken },
      processData: false,
      contentType: false,
      data: formData,
      async: true,
      success: function (response) {
        if (!response.isError) {
          $(".change_password").modal("hide");
          Swal.fire({
            title: "Success",
            text: response.Message,
            icon: "success",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !0,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.Message,
            icon: "error",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !0,
          });
        }
      },
      error: function (response) { },
    });
  });





  $("#customer_table tbody").on("click", ".profile-client", function (e) {
    e.preventDefault();
    $(".profile_change").modal("show");
    const id = $(this).attr("id");
    $('#save_image').attr('userid', id)
  });

  let Image = "";

  $("#image_file").on("change", function (e) {
    e.preventDefault();
    $('.preview_image').addClass('d-none');
    document.querySelector(".preview_image img").src = "";
    if ($(this).val() !== "") {
      Image = e.target.files[0];
      filePreview(e);
    }
  });

  function filePreview(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.preview_image').removeClass('d-none');
        document.querySelector(".preview_image img").src = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }


  $("#save_image").on("click", function (e) {
    e.preventDefault();
    const userid = $(this).attr('userid')

    let data = new FormData();
    data.append('userid', userid)
    data.append('image', Image)
    data.append('type', 'ChangeProfile')
    $.ajax({
      method: "POST",
      url: BASE_URL + "users/change_password",
      headers: { "X-CSRFToken": csrftoken },
      processData: false,
      contentType: false,
      data: data,
      async: true,
      success: function (response) {
        if (!response.isError) {
          Swal.fire({
            title: "Success",
            text: response.Message,
            icon: "success",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !0,
          }).then(e => {
            e.value &&
              $(".profile_change").modal("hide");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.Message,
            icon: "error",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: !1,
            showCloseButton: !0,
          });
        }
      },
      error: function (response) { },
    });
  });
});
