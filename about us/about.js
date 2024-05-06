document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    document.addEventListener("mouseleave", () => {
        cursor.style.display = "none";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.display = "block";
    });

    cursor.style.display = "none";
});
