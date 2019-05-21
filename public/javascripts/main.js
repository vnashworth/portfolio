$(".timeline a").click(function(e) {
    e.preventDefault();
    let href = $(this).attr("href");

    $(".job-description.active").slideToggle( "slow" );
    $(href).slideToggle( "slow" );

    $(".job-description").removeClass("active");
    $(href).addClass("active");
});
