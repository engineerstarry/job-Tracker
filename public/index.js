$("#menu-btn").click(function() {
    $("#menu").toggleClass("show");
    if ($(this).text() === "☰") {
        $(this).text("X");
    } else {
        $(this).text("☰");
    }
})