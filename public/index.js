$("#menu-btn").click(function() {
    $("#menu").toggleClass("show");
    if ($(this).text() === "☰") {
        $(this).text("X");
    } else {
        $(this).text("☰");
    }
})


$(".status").each(function () {

    const jobStatus = $(this).text().trim();

    if (jobStatus === "Applied") {
        $(this).addClass("applied");
    } else if (jobStatus === "Interviewing") {
        $(this).addClass("interview");
    } else if (jobStatus === "Offer Received") {
        $(this).addClass("accepted");
    }

});