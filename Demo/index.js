function togglePassword() {
  var x = document.getElementById("myInput");
  var y = document.getElementById("myInput2");

  if (x.type === "password") {
      x.type = "text";
      y.type = "text";
  } else {
      x.type = "password";
      y.type = "password";
  }
}
